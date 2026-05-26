import { Box } from '@/components/ui/box';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
  ArrowBigDown,
  ArrowBigUp,
  Clock3,
  Flame,
  MessageCircle,
  Plus,
  Search,
  Bell,
  MessageSquareMore,
  Users,
} from 'lucide-react-native';

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
    community: 'r/tpsit',
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
    community: 'r/frontend',
    author: 'ui_ninja',
    timeAgo: '5h',
    title: 'UI forum: meglio timeline classica o card immersive?',
    excerpt:
      'Mi ispira Reddit come UX base, ma vorrei aggiungere una metrica visiva per capire a colpo d\'occhio quali thread sono caldi.',
    comments: 39,
    score: 201,
  },
  {
    id: '3',
    community: 'r/reactnative',
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
  const [votes, setVotes] = useState<Record<string, 1 | -1 | 0>>({});
  const orderedPosts = posts;

  function toggleVote(postId: string, value: 1 | -1) {
    setVotes((prev) => {
      const current = prev[postId] ?? 0;
      return { ...prev, [postId]: current === value ? 0 : value };
    });
  }

  function getScore(post: Post) {
    const delta = votes[post.id] ?? 0;
    return post.score + delta;
  }

  return (
    <ScrollView className="flex-1 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      <Box className="w-full max-w-7xl self-center px-4 py-4 gap-5">
        <Box className="rounded-3xl border border-slate-700/50 bg-slate-950/90 px-5 py-4">
          <Box className="flex-row items-center gap-4">
            <Box className="flex-row items-center gap-3 pr-2">
              <Box className="h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-slate-600/60">
                <Users size={18} color="#f8fafc" />
              </Box>
              <Box>
                <Text className="text-white text-3xl font-black leading-none">Forum</Text>
              </Box>
            </Box>

            <Box className="flex-1 rounded-full border border-slate-700 bg-slate-900 px-4 h-12 justify-center">
              <Box className="flex-row items-center gap-2 h-full">
                <Search size={18} color="#94a3b8" />
                <Input
                  style={{ flex: 1, height: 48, borderWidth: 0, paddingVertical: 0 }}
                  placeholder="Trova qualsiasi cosa"
                  placeholderTextColor="#94a3b8"
                >
                  <InputField className="text-slate-100" />
                </Input>
              </Box>
            </Box>

            <Box className="flex-row items-center gap-2">

              <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900">
                <Bell size={18} color="#e2e8f0" />
              </TouchableOpacity>

              <TouchableOpacity className="h-12 rounded-full border border-blue-400/30 bg-blue-600 px-5 flex-row items-center gap-2">
                <Plus size={16} color="#ffffff" />
                <Text className="text-white font-semibold">Crea Nuovo Post</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/login')}
                className="h-12 rounded-full border border-slate-600 bg-slate-900 px-5 items-center justify-center"
              >
                <Text className="text-slate-100 font-semibold">Accedi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/register')}
                className="h-12 rounded-full bg-blue-600 px-5 items-center justify-center"
              >
                <Text className="text-white font-semibold">Crea</Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>

        <Box className="gap-4">
          {orderedPosts.map((post) => {
            const selectedVote = votes[post.id] ?? 0;

            return (
              <Box
                key={post.id}
                className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-4"
              >
                <Box className="flex-row">
                  <Box className="items-center pr-3 mr-3 border-r border-slate-700/60">
                    <TouchableOpacity onPress={() => toggleVote(post.id, 1)}>
                      <ArrowBigUp size={24} color={selectedVote === 1 ? '#60a5fa' : '#94a3b8'} />
                    </TouchableOpacity>
                    <Text className="text-white font-bold my-1">{getScore(post)}</Text>
                    <TouchableOpacity onPress={() => toggleVote(post.id, -1)}>
                      <ArrowBigDown size={24} color={selectedVote === -1 ? '#f87171' : '#94a3b8'} />
                    </TouchableOpacity>
                  </Box>

                  <Box className="flex-1 gap-2">
                    <Box className="flex-row items-center justify-between">
                      <Text className="text-slate-300 text-xs">
                        {post.community} • u/{post.author}
                      </Text>
                      <Box className="flex-row items-center gap-1">
                        <Clock3 size={13} color="#94a3b8" />
                        <Text className="text-slate-400 text-xs">{post.timeAgo}</Text>
                      </Box>
                    </Box>

                    <Text className="text-white text-lg font-bold">{post.title}</Text>
                    <Text className="text-slate-300">{post.excerpt}</Text>

                    <Box className="flex-row items-center justify-between mt-2">
                      <Box className="flex-row items-center gap-1">
                        <MessageCircle size={16} color="#94a3b8" />
                        <Text className="text-slate-300">{post.comments} commenti</Text>
                      </Box>

                      <TouchableOpacity className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2">
                        <Text className="text-slate-100 font-semibold">Apri</Text>
                      </TouchableOpacity>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>

      </Box>
    </ScrollView>
  );
}
