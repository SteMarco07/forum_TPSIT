import { requestJson, requestJsonWithToken } from './generalAPI'

export async function getPosts() {
  return requestJson('/posts/full')
}

export async function getPostById(postId) {
  return requestJson(`/posts/${postId}`)
}

export async function createPost(post, token) {
  return requestJsonWithToken('/posts/', token, {
    method: 'POST',
    body: JSON.stringify({
      title: post.title,
      content_text: post.content_text,
      topic_id: post.topic_id,
    }),
  })
}

export async function getTopics() {
  return requestJson('/topics/')
}

export async function createTopic(topic, token) {
  return requestJsonWithToken('/topics/', token, {
    method: 'POST',
    body: JSON.stringify({
      title: topic.title,
      description: topic.description,
      rules: topic.rules,
    }),
  })
}

export async function getPostsByTopic(topicId) {
  return requestJson(`/posts/topic/${topicId}/full`)
}

export async function getCommentsByPost(postId) {
  return requestJson(`/comments/post/${postId}`)
}

export async function createComment(comment, token) {
  return requestJsonWithToken('/comments/', token, {
    method: 'POST',
    body: JSON.stringify({
      content_text: comment.content_text,
      post_id: comment.post_id,
    }),
  })
}

export default {
  getPosts,
  createPost,
  getTopics,
  createTopic,
  getPostsByTopic,
  getPostById,
  getCommentsByPost,
  createComment,
}
