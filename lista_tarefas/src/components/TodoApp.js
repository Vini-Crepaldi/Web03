import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import InputTask from './InputTask';
import TodoItem from './TodoItem';

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  function handleAddTask(text) {
    if (!text || !text.trim()) return;
    if (editingIndex !== null) {
      const updated = [...tasks];
      updated[editingIndex] = text.trim();
      setTasks(updated);
      setEditingIndex(null);
    } else {
      setTasks(prev => [...prev, text.trim()]);
    }
  }

  function handleDelete(index) {
    setTasks(prev => prev.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  }

  function handleEdit(index) {
    setEditingIndex(index);
  }

  return (
    <View style={styles.container}>
      <InputTask onSubmit={handleAddTask} editingText={editingIndex !== null ? tasks[editingIndex] : ''} onCancel={() => setEditingIndex(null)} />
      {tasks.length === 0 ? (
        <Text style={styles.empty}>Nenhuma tarefa. Adicione uma acima.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item, idx) => String(idx)}
          renderItem={({ item, index }) => (
            <TodoItem
              text={item}
              onDelete={() => handleDelete(index)}
              onEdit={() => handleEdit(index)}
            />
          )}
          style={{ width: '100%' }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center' },
  empty: { marginTop: 24, color: '#666' }
});