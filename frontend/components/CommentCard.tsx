import React from 'react';
import { UserCircle2 } from 'lucide-react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

export type CommentCardProps = {
  authorUsername?: string;
  contentText: string;
};

export default function CommentCard({ authorUsername, contentText }: CommentCardProps) {
  return (
    <Box className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <Box className="flex-row items-center gap-2 mb-1">
        <UserCircle2 size={14} color="#64748b" />
        <Text className="text-sm font-semibold text-slate-300">
          u/{authorUsername || 'anonymous'}
        </Text>
      </Box>
      <Text className="text-sm text-slate-200">{contentText}</Text>
    </Box>
  );
}