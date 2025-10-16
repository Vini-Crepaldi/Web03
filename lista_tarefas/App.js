import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Title from './src/components/Title';
import TodoApp from './src/components/TodoApp';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Title />
      <View style={styles.content}>
        <TodoApp />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { paddingHorizontal: 16, paddingTop: 8 }
});