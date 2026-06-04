import React from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

export type CommentComposerProps = {
  username?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  submitting?: boolean;
};

export default function CommentComposer({
  username,
  value,
  onChangeText,
  onSubmit,
  submitting = false,
}: CommentComposerProps) {
  return (
    <Box className="gap-2 mt-2">
      {username ? <Text className="text-xs text-slate-400">Rispondi come u/{username}</Text> : null}
      <Box className="flex-row gap-2 items-end">
        <TextInput
          placeholder="Aggiungi un commento..."
          placeholderTextColor="#64748b"
          value={value}
          onChangeText={onChangeText}
          multiline
          className="flex-1 min-h-[44px] max-h-[120px] rounded-2xl border border-slate-800 bg-slate-900/60 p-3 text-slate-100 text-sm"
        />
        <TouchableOpacity
          onPress={onSubmit}
          disabled={submitting || !value.trim()}
          className="h-11 px-4 items-center justify-center rounded-2xl bg-blue-600 disabled:opacity-50"
        >
          <Text className="font-semibold text-white text-sm">
            {submitting ? 'Invia...' : 'Invia'}
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
}