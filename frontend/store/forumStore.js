import { create } from 'zustand';
import { getPosts, createPost, getTopics, createTopic } from '@/api/forumAPI'

// Forum store: gestisce posts e topics usando gli helper in /api/forumAPI.js
export const useForumStore = create((set, get) => ({
  posts: [],
  topics: [],
  loadingPosts: false,
  loadingTopics: false,
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

  addPost: async (post) => {
    // optimistic update
    const tempId = `temp-${Date.now()}`
    const temp = {
      id: tempId,
      community: post.topic || 't/general',
      author: post.author || 'you',
      timeAgo: 'adesso',
      title: post.title,
      excerpt: post.content?.length > 140 ? `${post.content.slice(0, 137)}...` : post.content,
      comments: 0,
      score: 0,
    }
    set((state) => ({ posts: [temp, ...state.posts] }))

    try {
      const created = await createPost(post)
      set((state) => ({ posts: state.posts.map((p) => (p.id === tempId ? created : p)) }))
      return created
    } catch (e) {
      // rollback
      set((state) => ({ posts: state.posts.filter((p) => p.id !== tempId), error: e.message || String(e) }))
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
      const created = await createTopic(topic)
      set((state) => ({ topics: state.topics.map((t) => (t.id === tempId ? created : t)) }))
      return created
    } catch (e) {
      set((state) => ({ topics: state.topics.filter((t) => t.id !== tempId), error: e.message || String(e) }))
      throw e
    }
  },
}))

export default useForumStore
