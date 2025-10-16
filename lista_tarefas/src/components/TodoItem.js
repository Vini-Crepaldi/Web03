import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TodoItem({ text, onDelete, onEdit }) {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.actionBtn}>
          <Text style={styles.edit}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.actionBtn}>
          <Text style={styles.delete}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff', padding: 12, marginBottom: 8, width: '100%',
    borderRadius: 8, borderWidth: 1, borderColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  text: { flex: 1 },
  actions: { flexDirection: 'row' },
  actionBtn: { marginLeft: 8 },
  edit: { color: '#2e86de', fontWeight: '600' },
  delete: { color: '#e74c3c', fontWeight: '600' }
});