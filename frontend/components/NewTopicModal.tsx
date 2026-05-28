import React, { useEffect, useState } from 'react'
import { Modal, TouchableOpacity, TextInput } from 'react-native'
import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'

type Props = {
  visible: boolean
  onClose: () => void
  onSubmit: (data: { title: string; description: string; rules: string }) => void
}

export default function NewTopicModal({ visible, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [rules, setRules] = useState('')

  useEffect(() => {
    if (!visible) {
      setTitle('')
      setDescription('')
      setRules('')
    }
  }, [visible])

  function handleSubmit() {
    if (!title.trim() || !description.trim()) return
    onSubmit({ title: title.trim(), description: description.trim(), rules: rules.trim() })
    onClose()
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Box className="flex-1 items-center justify-center bg-black/60 px-6">
        <Box className="w-full max-w-md rounded-3xl bg-slate-900 p-6">
          <Box className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-white">Crea nuovo topic</Text>
          </Box>

          <Text className="mb-2 text-slate-300">Titolo</Text>
          <TextInput
            className="h-11 rounded-lg border border-slate-700 bg-slate-900 px-3 text-slate-100"
            placeholder="Titolo del topic"
            placeholderTextColor="#94a3b8"
            value={title}
            onChangeText={setTitle}
          />

          <Text className="mb-2 mt-3 text-slate-300">Descrizione</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            multiline
            placeholder="Breve descrizione del topic"
            placeholderTextColor="#94a3b8"
            className="min-h-30 rounded-lg border border-slate-700 bg-slate-900 p-3 text-slate-100"
          />

          <Text className="mb-2 mt-3 text-slate-300">Regole</Text>
          <TextInput
            value={rules}
            onChangeText={setRules}
            multiline
            placeholder="Regole e linee guida per il topic"
            placeholderTextColor="#94a3b8"
            className="min-h-30 rounded-lg border border-slate-700 bg-slate-900 p-3 text-slate-100"
          />

          <Box className="mt-4 flex-row justify-end gap-2">
            <TouchableOpacity onPress={onClose} className="rounded-lg border border-slate-700 px-4 py-2">
              <Text className="text-slate-100">Annulla</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} className="rounded-lg bg-blue-600 px-4 py-2">
              <Text className="text-white">Crea Topic</Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
