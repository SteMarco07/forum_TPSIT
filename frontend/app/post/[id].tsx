import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, TouchableOpacity, useWindowDimensions, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MessageSquare, UserCircle2 } from 'lucide-react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import CommentCard from '@/components/CommentCard';
import CommentComposer from '@/components/CommentComposer';
import { useForumStore } from '@/store/forumStore';
import { useAppStore } from '@/store/authStore';

type Post = {
  id: string;
  title: string;
  content_text: string | null;
  author_id: string;
  topic_id: number;
  author_username: string;
  topic_name: string;
  likes_count: number;
  comments_count: number;
};

type Comment = {
  id: string;
  content_text: string;
  author_id: string;
  post_id: string;
  author_username?: string;
};

export default function PostDetailPage() {
  const { id } = useLocalSearchParams();
  const postId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : undefined;
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isCompact = width < 768;

  const posts = useForumStore((state: { posts: Post[] }) => state.posts);
  const currentPostComments = useForumStore((state: { currentPostComments: Comment[] }) => state.currentPostComments);
  const loadingPosts = useForumStore((state: { loadingPosts: boolean }) => state.loadingPosts);
  const loadingComments = useForumStore((state: { loadingComments: boolean }) => state.loadingComments);
  const fetchPosts = useForumStore((state: any) => state.fetchPosts);
  const fetchCommentsByPost = useForumStore((state: any) => state.fetchCommentsByPost);
  const addComment = useForumStore((state: any) => state.addComment);

  const user = useAppStore((state: any) => state.user);
  const [newCommentText, setNewCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  const handleSendComment = async () => {
    if (!postId || !newCommentText.trim()) return;
    setSubmittingComment(true);
    try {
      await addComment({
        content_text: newCommentText.trim(),
        post_id: postId,
      });
      setNewCommentText('');
    } catch (e: any) {
      console.error(e);
      alert(e.message || 'Errore durante l\'aggiunta del commento');
    } finally {
      setSubmittingComment(false);
    }
  };

  const cachedPost = useMemo(
    () => posts.find((post) => String(post.id) === String(postId)),
    [posts, postId]
  );

  const postDetail = cachedPost;

  useEffect(() => {
    if (!postId) {
      return;
    }

    if (!cachedPost && posts.length === 0) {
      fetchPosts();
    }

  }, [postId, cachedPost, posts.length, fetchPosts]);

  useEffect(() => {
    fetchCommentsByPost(postId);
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#020617' }} contentContainerStyle={{ flexGrow: 1 }}>
      <Box className={`w-full self-center gap-5 px-4 ${isCompact ? 'py-4' : 'max-w-7xl py-4'}`}>
        <SafeAreaView edges={["top"]}>
          <Box className="rounded-3xl border border-slate-700/50 bg-slate-950/95 px-4 py-4 md:px-5">
            <Box className="flex-row items-center gap-4">
              <TouchableOpacity
                onPress={() => router.replace('/forum')}
                className="h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900"
              >
                <ArrowLeft size={20} color="#f8fafc" />
              </TouchableOpacity>
              <Box className="flex-1">
                <Text className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Dettaglio post
                </Text>
              </Box>
            </Box>
          </Box>
        </SafeAreaView>

        {loadingPosts && !postDetail ? (
          <Box className="items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/60 py-12">
            <Text className="text-slate-400">Caricamento post in corso...</Text>
          </Box>
        ) : postDetail ? (
          <>
            <Box className="rounded-3xl border border-slate-700/50 bg-slate-900/80 p-5">
              <Box className="flex-row items-center justify-between gap-3">
                <Box className="flex-row items-center gap-2">
                  <UserCircle2 size={18} color="#94a3b8" />
                  <Text className="text-sm text-slate-300">u/{postDetail.author_username}</Text>
                  <Text className="text-sm text-slate-500">•</Text>
                  <Text className="text-sm text-slate-300">t/{postDetail.topic_name}</Text>
                </Box>

                <Box className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1">
                  <Text className="text-xs font-semibold text-slate-300">
                    {postDetail.likes_count} like • {postDetail.comments_count} commenti
                  </Text>
                </Box>
              </Box>

              <Text className="mt-4 text-2xl font-bold text-white">{postDetail.title}</Text>
              {postDetail.content_text ? (
                <Text className="mt-3 text-base leading-6 text-slate-300">{postDetail.content_text}</Text>
              ) : (
                <Text className="mt-3 text-base leading-6 text-slate-400">Nessun contenuto disponibile.</Text>
              )}
            </Box>

            <Box className="gap-3 rounded-3xl border border-slate-700/50 bg-slate-950/95 p-5">
              <Box className="flex-row items-center gap-2">
                <MessageSquare size={18} color="#94a3b8" />
                <Text className="text-lg font-bold text-white">Commenti</Text>
              </Box>

              {user ? (
                <CommentComposer
                  username={user.username}
                  value={newCommentText}
                  onChangeText={setNewCommentText}
                  onSubmit={handleSendComment}
                  submitting={submittingComment}
                />
              ) : (
                <Box className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 items-center mt-2">
                  <Text className="text-slate-400 text-sm">Accedi per poter commentare questo post.</Text>
                </Box>
              )}

              <Box className="mt-4 gap-3">
                {loadingComments ? (
                  <Text className="py-4 text-slate-400">Caricamento commenti in corso...</Text>
                ) : currentPostComments.length > 0 ? (
                  currentPostComments.map((comment) => (
                    <CommentCard
                      key={comment.id}
                      authorUsername={comment.author_username}
                      contentText={comment.content_text}
                    />
                  ))
                ) : (
                  <Text className="py-4 text-slate-400">Non ci sono commenti per questo post.</Text>
                )}
              </Box>
            </Box>
          </>
        ) : (
          <Box className="items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/60 py-12">
            <Text className="text-slate-400">Post non trovato.</Text>
          </Box>
        )}
      </Box>
    </ScrollView>
  );
}