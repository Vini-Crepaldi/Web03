import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Title() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lista de Tarefas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold', color: '#111' }
});