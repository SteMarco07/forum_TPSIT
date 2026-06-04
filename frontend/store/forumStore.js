import { create } from 'zustand';
import { getPosts, createPost, getTopics, createTopic, getPostsByTopic } from '@/api/forumAPI'
import { useAppStore } from './authStore'

// Forum store: gestisce posts e topics usando gli helper in /api/forumAPI.js
export const useForumStore = create((set, get) => ({
  posts: [],
  topics: [],
  topicPosts: [],
  loadingPosts: false,
  loadingTopics: false,
  loadingTopicPosts: false,
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
}))

export default useForumStore
