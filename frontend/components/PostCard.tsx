import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { ArrowBigUp, MessageCircle } from 'lucide-react-native';

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

type Props = {
  post: Post;
  onPressTopic?: (topicId: number) => void;
};

export default function PostCard({ post, onPressTopic }: Props) {
  const [vote, setVote] = useState<0 | 1>(0);

  function toggleVote() {
    setVote((prev) => (prev === 1 ? 0 : 1));
  }

  const score = post.likes_count + vote;

  return (
    <Box className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-4">
      <Box className="flex-row">
        <Box className="mr-3 items-center border-r border-slate-700/60 pr-3">
          <TouchableOpacity onPress={toggleVote}>
            <ArrowBigUp size={24} color={vote === 1 ? '#60a5fa' : '#94a3b8'} />
          </TouchableOpacity>
          <Text className="my-1 font-bold text-white">{score}</Text>
        </Box>

        <Box className="flex-1 gap-2">
          <Box className="flex-row items-center justify-between">
            <Box className="flex-row items-center">
              {onPressTopic ? (
                <TouchableOpacity onPress={() => onPressTopic(post.topic_id)}>
                  <Text className="text-xs font-semibold text-blue-400">t/{post.topic_name}</Text>
                </TouchableOpacity>
              ) : (
                <Text className="text-xs font-semibold text-slate-300">t/{post.topic_name}</Text>
              )}
              <Text className="text-xs text-slate-400"> • u/{post.author_username}</Text>
            </Box>
          </Box>

          <Text className="text-lg font-bold text-white">{post.title}</Text>
          {post.content_text ? (
            <Text className="text-slate-300">{post.content_text}</Text>
          ) : null}

          <Box className="mt-2 flex-row items-center justify-between">
            <Box className="flex-row items-center gap-1">
              <MessageCircle size={16} color="#94a3b8" />
              <Text className="text-slate-300">{post.comments_count} commenti</Text>
            </Box>

            <TouchableOpacity className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2">
              <Text className="font-semibold text-slate-100">Apri</Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
