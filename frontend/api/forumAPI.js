// API helper per posts e topics (mocked, sviluppamento)

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

let posts = [
  {
    id: '1',
    community: 't/tpsit',
    author: 'marco_dev',
    timeAgo: '2h',
    title: 'Pattern utile per separare store Zustand e chiamate API',
    excerpt:
      'Sto testando una struttura con API mock isolate e store unico. Voi come organizzate i moduli quando il progetto cresce?',
    comments: 24,
    score: 152,
  },
  {
    id: '2',
    community: 't/frontend',
    author: 'ui_ninja',
    timeAgo: '5h',
    title: 'UI forum: meglio timeline classica o card immersive?',
    excerpt:
      "Mi ispira Reddit come UX base, ma vorrei aggiungere una metrica visiva per capire a colpo d'occhio quali thread sono caldi.",
    comments: 39,
    score: 201,
  },
]

let topics = [
  { id: 't1', title: 'tpsit', description: 'Discussioni TPSIT', rules: 'Sii rispettoso' },
  { id: 't2', title: 'frontend', description: 'UI/UX e frontend', rules: 'Niente spam' },
]

export async function getPosts() {
  await delay(300)
  return posts
}

export async function createPost(post) {
  await delay(300)
  const created = {
    id: Date.now().toString(),
    community: post.topic || 't/general',
    author: post.author || 'you',
    timeAgo: 'adesso',
    title: post.title,
    excerpt: post.content?.length > 140 ? `${post.content.slice(0, 137)}...` : post.content,
    comments: 0,
    score: 0,
  }
  posts = [created, ...posts]
  return created
}

export async function getTopics() {
  await delay(200)
  return topics
}

export async function createTopic(topic) {
  await delay(300)
  const created = { id: Date.now().toString(), title: topic.title, description: topic.description, rules: topic.rules }
  topics = [created, ...topics]
  return created
}

export default { getPosts, createPost, getTopics, createTopic }
