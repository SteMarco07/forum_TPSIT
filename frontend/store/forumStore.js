import { create } from 'zustand';
import { getPosts, createPost, getTopics, createTopic, getPostsByTopic, getPostById, getCommentsByPost, createComment } from '@/api/forumAPI'
import { useAppStore } from './authStore'

// Forum store: gestisce posts e topics usando gli helper in /api/forumAPI.js
export const useForumStore = create((set, get) => ({
  posts: [],
  topics: [],
  topicPosts: [],
  currentPost: null,
  currentPostComments: [],
  currentPostCommentsPostId: null,
  loadingPosts: false,
  loadingTopics: false,
  loadingTopicPosts: false,
  loadingCurrentPost: false,
  loadingComments: false,
  error: null,


  fetchPosts: async () => {
    set({ loadingPosts: true, error: null })
    try {
      const data = await getPosts()
      set({ posts: data, loadingPosts: false })
    } catch (e) {
      set({ error: e.message || String(e), loadingPosts: false })
    }
  },

  fetchPostsByTopic: async (topicId) => {
    set({ loadingTopicPosts: true, error: null })
    try {
      const data = await getPostsByTopic(topicId)
      set({ topicPosts: data, loadingTopicPosts: false })
    } catch (e) {
      set({ error: e.message || String(e), loadingTopicPosts: false })
    }
  },

  addPost: async (post) => {
    try {
      const token = useAppStore.getState().token
      const user = useAppStore.getState().user

      let topics = get().topics
      if (topics.length === 0) {
        topics = await getTopics()
        set({ topics })
      }

      const topicTitle = post.topic ? post.topic.replace(/^t\//, '') : 'general'
      const foundTopic = topics.find((t) => t.title.toLowerCase() === topicTitle.toLowerCase())

      if (!foundTopic) {
        throw new Error('Topic non trovato')
      }

      const created = await createPost({
        title: post.title,
        content_text: post.content,
        topic_id: foundTopic.id,
      }, token)

      const fullCreated = {
        id: created.id,
        title: created.title,
        content_text: created.content_text,
        author_id: created.author_id,
        topic_id: created.topic_id,
        author_username: user?.username || '',
        topic_name: foundTopic.title,
        likes_count: 0,
        comments_count: 0,
      }

      set((state) => ({ posts: [fullCreated, ...state.posts] }))
      return fullCreated
    } catch (e) {
      set({ error: e.message || String(e) })
      throw e
    }
  },

  fetchTopics: async () => {
    set({ loadingTopics: true, error: null })
    try {
      const data = await getTopics()
      set({ topics: data, loadingTopics: false })
    } catch (e) {
      set({ error: e.message || String(e), loadingTopics: false })
    }
  },

  addTopic: async (topic) => {
    const tempId = `temp-${Date.now()}`
    const temp = { id: tempId, title: topic.title, description: topic.description, rules: topic.rules }
    set((state) => ({ topics: [temp, ...state.topics] }))

    try {
      const token = useAppStore.getState().token
      const created = await createTopic(topic, token)
      set((state) => ({ topics: state.topics.map((t) => (t.id === tempId ? created : t)) }))
      return created
    } catch (e) {
      set((state) => ({ topics: state.topics.filter((t) => t.id !== tempId), error: e.message || String(e) }))
      throw e
    }
  },

  fetchPostById: async (postId) => {
    set({ loadingCurrentPost: true, error: null })
    try {
      const data = await getPostById(postId)
      set({ currentPost: data, loadingCurrentPost: false })
    } catch (e) {
      set({ error: e.message || String(e), loadingCurrentPost: false })
    }
  },

  fetchCommentsByPost: async (postId, options = {}) => {
    const force = Boolean(options.force)
    const { currentPostCommentsPostId } = get()

    if (!force && String(currentPostCommentsPostId) === String(postId)) {
      return
    }

    set({
      loadingComments: true,
      error: null,
      currentPostComments: String(currentPostCommentsPostId) === String(postId) ? get().currentPostComments : [],
    })
    try {
      const data = await getCommentsByPost(postId)
      console.log('Fetched comments for post', postId, data)
      set({ currentPostComments: data, currentPostCommentsPostId: postId, loadingComments: false })
    } catch (e) {
      set({ error: e.message || String(e), loadingComments: false })
    }
  },

  addComment: async (commentData) => {
    try {
      const token = useAppStore.getState().token
      const user = useAppStore.getState().user

      const created = await createComment({
        content_text: commentData.content_text,
        post_id: commentData.post_id,
      }, token)

      const fullCreated = {
        ...created,
        author_username: user?.username || 'anonymous'
      }

      set((state) => {
        const isCurrentPost = String(state.currentPostCommentsPostId) === String(commentData.post_id)
        const updatedCurrentPost = state.currentPost && state.currentPost.id === commentData.post_id
          ? { ...state.currentPost, comments_count: (state.currentPost.comments_count || 0) + 1 }
          : state.currentPost;

        const updatedPosts = state.posts.map((post) => (
          post.id === commentData.post_id
            ? { ...post, comments_count: (post.comments_count || 0) + 1 }
            : post
        ));

        const updatedTopicPosts = state.topicPosts.map((post) => (
          post.id === commentData.post_id
            ? { ...post, comments_count: (post.comments_count || 0) + 1 }
            : post
        ));

        return {
          currentPostComments: isCurrentPost ? [...state.currentPostComments, fullCreated] : state.currentPostComments,
          currentPost: updatedCurrentPost,
          posts: updatedPosts,
          topicPosts: updatedTopicPosts
        };
      })
      
      return fullCreated
    } catch (e) {
      set({ error: e.message || String(e) })
      throw e
    }
  },
}))

export default useForumStore
