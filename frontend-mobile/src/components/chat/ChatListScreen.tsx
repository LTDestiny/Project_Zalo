import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ChatListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chat List - Coming Soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
