import { requestJson, requestJsonWithToken } from './generalAPI'

export async function getPosts() {
  return requestJson('/posts/full')
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

export default { getPosts, createPost, getTopics, createTopic }
