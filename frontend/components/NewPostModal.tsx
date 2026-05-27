import React, { useState, useEffect } from 'react';
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
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (!visible) {
            // reset when closed
            setTopic(topics[0]);
            setTitle('');
            setContent('');
        }
    }, [visible]);

    function handleSubmit() {
        // Basic validation
        if (!title.trim() || !content.trim()) return;
        onSubmit({ topic, title: title.trim(), content: content.trim() });
        onClose();
    }

    return (
        <Modal visible={visible} transparent animationType="fade">
            <Box className="flex-1 items-center justify-center bg-black/60 px-6">
                <Box className="bg-slate-900 p-6 rounded-3xl w-full max-w-md">
                    <Box className="flex-row items-center justify-between mb-3">
                        <Text className="text-white text-lg font-bold">Nuovo Post</Text>
                    </Box>

                    <Text className="text-slate-300 mb-2">Topic</Text>
                    <Box className="flex-row gap-2 mb-3">
                        {topics.map((t) => (
                            <TouchableOpacity
                                key={t}
                                onPress={() => setTopic(t)}
                                className={`px-3 py-2 rounded-lg ${topic === t ? 'bg-blue-600' : 'bg-slate-800'}`}>
                                <Text className={topic === t ? 'text-white' : 'text-slate-300'}>{t}</Text>
                            </TouchableOpacity>
                        ))}
                    </Box>

                    <Text className="text-slate-300 mb-2">Titolo</Text>
                    <TextInput
                        className="h-11 px-3 border rounded-lg border-slate-700 bg-slate-900 text-slate-100"
                        placeholder="Titolo del post"
                        placeholderTextColor="#94a3b8"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text className="text-slate-300 mb-2 mt-3 ">Contenuto</Text>
                    <TextInput
                        value={content}
                        onChangeText={setContent}
                        multiline
                        placeholder="Contenuto del post"
                        placeholderTextColor="#94a3b8"
                        className="min-h-30  p-3 border rounded-lg border-slate-700 bg-slate-900"
                    />

                    <Box className="flex-row justify-end gap-2 mt-4">
                        <TouchableOpacity onPress={onClose} className="px-4 py-2 rounded-lg border border-slate-700">
                            <Text className="text-slate-100">Annulla</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmit} className="px-4 py-2 rounded-lg bg-blue-600">
                            <Text className="text-white">Pubblica</Text>
                        </TouchableOpacity>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}
