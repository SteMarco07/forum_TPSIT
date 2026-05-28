import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ScrollView, TouchableOpacity, TextInput } from 'react-native';
import {
  ArrowBigUp,
  Clock3,
  MessageCircle,
  Plus,
  Search,
  Bell,
  Users,
} from 'lucide-react-native';
import NewPostModal from '@/components/NewPostModal';

type Post = {
  id: string;
  community: string;
  author: string;
  timeAgo: string;
  title: string;
  excerpt: string;
  comments: number;
  score: number;
};

const posts: Post[] = [
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
  {
    id: '3',
    community: 't/reactnative',
    author: 'expo_builder',
    timeAgo: '1d',
    title: 'Expo Router: gestione route pubbliche e private',
    excerpt:
      'Avete un pattern pulito per impedire redirect strani tra login e home quando si usa autenticazione mock?',
    comments: 12,
    score: 88,
  },
];

export default function ForumHome() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isCompact = width < 768;
  const [votes, setVotes] = useState<Record<string, 0 | 1>>({});
  const [localPosts, setLocalPosts] = useState(posts);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function toggleVote(postId: string, value: 1) {
    setVotes((prev) => {
      const current = prev[postId] ?? 0;
      return { ...prev, [postId]: current === value ? 0 : value };
    });
  }

  function getScore(post: Post) {
    const delta = votes[post.id] ?? 0;
    return post.score + delta;
  }

  function handleAddPost(data: { topic: string; title: string; content: string }) {
    const newPost: Post = {
      id: Date.now().toString(),
      community: data.topic,
      author: 'you',
      timeAgo: 'adesso',
      title: data.title,
      excerpt: data.content.length > 140 ? `${data.content.slice(0, 137)}...` : data.content,
      comments: 0,
      score: 0,
    };

    setLocalPosts((currentPosts) => [newPost, ...currentPosts]);
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#020617' }} contentContainerStyle={{ flexGrow: 1 }}>
      <Box className={`w-full self-center gap-5 px-4 ${isCompact ? 'py-4' : 'max-w-7xl py-4'}`}>
        <Box className="rounded-3xl border border-slate-700/50 bg-slate-950/95 px-4 py-4 md:px-5">
          <Box className={`gap-4 ${isCompact ? 'flex-col' : 'flex-row items-center'}`}>
            <Box className="flex-row items-center gap-3 pr-2">
              <Box className="h-12 w-12 items-center justify-center rounded-2xl border border-slate-600/60 bg-white/10">
                <Users size={18} color="#f8fafc" />
              </Box>
              <Box>
                <Text className="text-3xl font-black leading-none text-white">Forum</Text>
              </Box>
            </Box>

            <Box className="h-12 flex-1 justify-center rounded-full border border-slate-700 bg-slate-900 px-4">
              <Box className="flex-row items-center gap-2 h-full">
                <Search size={18} color="#94a3b8" />
                <TextInput
                  placeholder="Trova qualsiasi cosa"
                  placeholderTextColor="#94a3b8"
                  style={{ flex: 1, height: 48, color: '#e2e8f0', paddingVertical: 0 }}
                />
              </Box>
            </Box>

            <Box className={`flex-row items-center gap-2 ${isCompact ? 'flex-wrap' : ''}`}>
              <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900">
                <Bell size={18} color="#e2e8f0" />
              </TouchableOpacity>

              <TouchableOpacity
                className="h-12 flex-row items-center gap-2 rounded-full border border-blue-400/30 bg-blue-600 px-5"
                onPress={() => setIsModalVisible(true)}
              >
                <Plus size={16} color="#ffffff" />
                <Text className="font-semibold text-white">Crea Nuovo Post</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/login')} className="h-12 items-center justify-center rounded-full border border-slate-600 bg-slate-900 px-5">
                <Text className="font-semibold text-slate-100">Accedi</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/register')} className="h-12 items-center justify-center rounded-full bg-blue-600 px-5">
                <Text className="font-semibold text-white">Crea</Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>

        <Box className="gap-4">
          {localPosts.map((post) => {
            const selectedVote = votes[post.id] ?? 0;

            return (
              <Box key={post.id} className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-4">
                <Box className="flex-row">
                  <Box className="mr-3 items-center border-r border-slate-700/60 pr-3">
                    <TouchableOpacity onPress={() => toggleVote(post.id, 1)}>
                      <ArrowBigUp size={24} color={selectedVote === 1 ? '#60a5fa' : '#94a3b8'} />
                    </TouchableOpacity>
                    <Text className="my-1 font-bold text-white">{getScore(post)}</Text>
                  </Box>

                  <Box className="flex-1 gap-2">
                    <Box className="flex-row items-center justify-between">
                      <Text className="text-xs text-slate-300">{post.community} • u/{post.author}</Text>
                      <Box className="flex-row items-center gap-1">
                        <Clock3 size={13} color="#94a3b8" />
                        <Text className="text-xs text-slate-400">{post.timeAgo}</Text>
                      </Box>
                    </Box>

                    <Text className="text-lg font-bold text-white">{post.title}</Text>
                    <Text className="text-slate-300">{post.excerpt}</Text>

                    <Box className="mt-2 flex-row items-center justify-between">
                      <Box className="flex-row items-center gap-1">
                        <MessageCircle size={16} color="#94a3b8" />
                        <Text className="text-slate-300">{post.comments} commenti</Text>
                      </Box>

                      <TouchableOpacity className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2">
                        <Text className="font-semibold text-slate-100">Apri</Text>
                      </TouchableOpacity>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>

        <NewPostModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleAddPost}
        />
      </Box>
    </ScrollView>
  );
}