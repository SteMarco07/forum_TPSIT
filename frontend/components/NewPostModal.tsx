import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity, TextInput } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { topic: string; title: string; content: string }) => void;
};

const topics = ['t/tpsit', 't/frontend', 't/reactnative'];

export default function NewPostModal({ visible, onClose, onSubmit }: Props) {
  const [topic, setTopic] = useState(topics[0]);
  const [topicOpen, setTopicOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!visible) {
      setTopic(topics[0]);
      setTitle('');
      setContent('');
      setTopicOpen(false);
    }
  }, [visible]);

  function handleSubmit() {
    if (!title.trim() || !content.trim()) return;
    onSubmit({ topic, title: title.trim(), content: content.trim() });
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Box className="flex-1 items-center justify-center bg-black/60 px-6">
        <Box className="w-full max-w-md rounded-3xl bg-slate-900 p-6">
          <Box className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-white">Nuovo Post</Text>
          </Box>

          <Text className="mb-2 text-slate-300">Topic</Text>
          <Box className="relative mb-3">
            <TouchableOpacity
              onPress={() => setTopicOpen((value) => !value)}
              className="flex-row items-center justify-between rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
            >
              <Text className="text-slate-100">{topic}</Text>
            </TouchableOpacity>

            {topicOpen ? (
              <Box className="absolute left-0 right-0 z-50 mt-2 rounded-lg border border-slate-700 bg-slate-800 shadow-lg">
                {topics.map((item, index) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      setTopic(item);
                      setTopicOpen(false);
                    }}
                    className={`px-3 py-2 ${item === topic ? 'bg-blue-600' : ''} ${index < topics.length - 1 ? 'border-b border-slate-700' : ''}`}
                  >
                    <Text className={item === topic ? 'text-white' : 'text-slate-300'}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </Box>
            ) : null}
          </Box>

          <Text className="mb-2 text-slate-300">Titolo</Text>
          <TextInput
            className="h-11 rounded-lg border border-slate-700 bg-slate-900 px-3 text-slate-100"
            placeholder="Titolo del post"
            placeholderTextColor="#94a3b8"
            value={title}
            onChangeText={setTitle}
          />

          <Text className="mb-2 mt-3 text-slate-300">Contenuto</Text>
          <TextInput
            value={content}
            onChangeText={setContent}
            multiline
            placeholder="Contenuto del post"
            placeholderTextColor="#94a3b8"
            className="min-h-30 rounded-lg border border-slate-700 bg-slate-900 p-3 text-slate-100"
          />

          <Box className="mt-4 flex-row justify-end gap-2">
            <TouchableOpacity onPress={onClose} className="rounded-lg border border-slate-700 px-4 py-2">
              <Text className="text-slate-100">Annulla</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} className="rounded-lg bg-blue-600 px-4 py-2">
              <Text className="text-white">Pubblica</Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}