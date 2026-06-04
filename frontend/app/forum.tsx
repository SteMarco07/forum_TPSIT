import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import React, { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ScrollView, TouchableOpacity, TextInput } from 'react-native';
import {
  Plus,
  Search,
  Bell,
  Users,
  LogOut,
} from 'lucide-react-native';
import NewPostModal from '@/components/NewPostModal';
import PostCard from '@/components/PostCard';
import NewTopicModal from '@/components/NewTopicModal';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { useForumStore } from '@/store/forumStore';
import { useAppStore } from '@/store/authStore';

type Post = {
  id: string
  title: string
  content_text: string | null
  author_id: string
  topic_id: number
  author_username: string
  topic_name: string
  likes_count: number
  comments_count: number
}

export default function ForumHome() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isCompact = width < 768;
  const localPosts = useForumStore((s: { posts: any[] }) => s.posts) as Post[];
  const fetchPosts = useForumStore((s: any) => s.fetchPosts);
  const fetchTopics = useForumStore((s: any) => s.fetchTopics);
  const addPost = useForumStore((s: any) => s.addPost);
  const addTopic = useForumStore((s: any) => s.addTopic);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTopicModalVisible, setIsTopicModalVisible] = useState(false);

  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);



  async function handleAddPost(data: { topic: string; title: string; content: string }) {
    try {
      await addPost({ topic: data.topic, title: data.title, content: data.content })
    } catch (e) {
      console.error('Errore addPost', e)
    }
  }

  async function handleLogout() {
    try {
      // `logout()` in authStore gestisce la rimozione da AsyncStorage e il reset dello stato
      await logout();
      router.replace('/login');
    } catch (e) {
      alert('Errore durante il logout');
    }
  }

  useEffect(() => {
    fetchPosts()
    fetchTopics()
  }, [fetchPosts, fetchTopics])

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#020617' }} contentContainerStyle={{ flexGrow: 1 }}>
      <Box className={`w-full self-center gap-5 px-4 ${isCompact ? 'py-4' : 'max-w-7xl py-4'}`}>
        <SafeAreaView edges={["top"]}>
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
                
                {!user ? (
                  <>
                    <TouchableOpacity onPress={() => router.push('/login')} className="h-12 items-center justify-center rounded-full border border-slate-600 bg-slate-900 px-5">
                      <Text className="font-semibold text-slate-100">Accedi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/register')} className="h-12 items-center justify-center rounded-full bg-blue-600 px-5">
                      <Text className="font-semibold text-white">Crea</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      className="h-12 flex-row items-center gap-2 rounded-full border border-blue-400/30 bg-blue-600 px-5"
                      onPress={() => setIsModalVisible(true)}
                    >
                      <Plus size={16} color="#ffffff" />
                      <Text className="font-semibold text-white">Crea Nuovo Post</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setIsTopicModalVisible(true)}
                      className="h-12 items-center justify-center rounded-full border border-green-500 bg-green-600 px-4"
                    >
                      <Text className="font-semibold text-white">Crea Topic</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={handleLogout} className="h-12 flex-row items-center gap-2 rounded-full border border-red-500 bg-red-600 px-4">
                      <LogOut size={16} color="#fff" />
                      <Text className="font-semibold text-white">Logout</Text>
                    </TouchableOpacity>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </SafeAreaView>

        <Box className="gap-4">
          {localPosts.map((localPost) => (
            <PostCard
              key={localPost.id}
              post={localPost}
              onPressTopic={(topicId) => router.push(`/topic/${topicId}`)}
            />
          ))}
        </Box>

        <NewPostModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleAddPost}
        />
        <NewTopicModal
          visible={isTopicModalVisible}
          onClose={() => setIsTopicModalVisible(false)}
          onSubmit={async (data) => {
            try {
              await addTopic({ title: data.title, description: data.description, rules: data.rules })
            } catch (e) {
              console.error('Errore addTopic', e)
            }
            setIsTopicModalVisible(false)
          }}
        />
      </Box>
    </ScrollView>
  );
}