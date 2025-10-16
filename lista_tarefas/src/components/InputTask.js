import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function InputTask({ onSubmit, editingText, onCancel }) {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(editingText || '');
  }, [editingText]);

  function handlePress() {
    onSubmit(text);
    setText('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite uma tarefa"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>{editingText ? 'Salvar' : 'Adicionar'}</Text>
      </TouchableOpacity>
      {editingText ? (
        <TouchableOpacity style={styles.cancel} onPress={() => { setText(''); onCancel(); }}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginBottom: 12 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 8
  },
  button: {
    backgroundColor: '#2e86de', padding: 12, borderRadius: 8, alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  cancel: { marginTop: 8, alignItems: 'center' },
  cancelText: { color: '#999' }
});