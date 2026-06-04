import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, BookOpen } from 'lucide-react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { useForumStore } from '@/store/forumStore';
import PostCard from '@/components/PostCard';

type Topic = {
  id: number;
  title: string;
  description: string;
  rules: string;
};

export default function TopicPostsPage() {
  const { id } = useLocalSearchParams();
  const topicId = parseInt(typeof id === 'string' ? id : '1', 10);
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isCompact = width < 768;

  const topics = useForumStore((state: { topics: Topic[] }) => state.topics);
  const topic = topics.find((t) => t.id === topicId);

  const topicPosts = useForumStore((state: any) => state.topicPosts);
  const fetchPostsByTopic = useForumStore((state: any) => state.fetchPostsByTopic);
  const loading = useForumStore((state: any) => state.loadingTopicPosts);

  useEffect(() => {
    if (topicId) {
      fetchPostsByTopic(topicId);
    }
  }, [topicId, fetchPostsByTopic]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#020617' }} contentContainerStyle={{ flexGrow: 1 }}>
      <Box className={`w-full self-center gap-5 px-4 ${isCompact ? 'py-4' : 'max-w-7xl py-4'}`}>
        <SafeAreaView edges={["top"]}>
          <Box className="rounded-3xl border border-slate-700/50 bg-slate-950/95 px-4 py-4 md:px-5">
            <Box className="flex-row items-center gap-4">
              <TouchableOpacity
                onPress={() => router.back()}
                className="h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900"
              >
                <ArrowLeft size={20} color="#f8fafc" />
              </TouchableOpacity>
              <Box className="flex-1">
                <Text className="text-3xl font-black leading-none text-white">
                  t/{topic ? topic.title : 'Topic'}
                </Text>
                {topic ? (
                  <Text className="mt-1 text-sm text-slate-400">
                    {topic.description}
                  </Text>
                ) : null}
              </Box>
            </Box>

            {topic?.rules ? (
              <Box className="mt-4 rounded-xl bg-slate-900/60 p-3 border border-slate-800">
                <Box className="flex-row items-center gap-1.5 mb-1">
                  <BookOpen size={14} color="#94a3b8" />
                  <Text className="text-xs font-semibold text-slate-300">Regole del topic</Text>
                </Box>
                <Text className="text-xs text-slate-400">{topic.rules}</Text>
              </Box>
            ) : null}
          </Box>
        </SafeAreaView>

        <Box className="gap-4">
          {loading ? (
            <Text className="text-center text-slate-400 py-8">Caricamento post in corso...</Text>
          ) : topicPosts && topicPosts.length > 0 ? (
            topicPosts.map((post: any) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))
          ) : (
            <Box className="items-center justify-center py-12 rounded-2xl border border-slate-850 bg-slate-950/50">
              <Text className="text-slate-400 text-lg">Nessun post trovato per questo topic</Text>
            </Box>
          )}
        </Box>
      </Box>
    </ScrollView>
  );
}
