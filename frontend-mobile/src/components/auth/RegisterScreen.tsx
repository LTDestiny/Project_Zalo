import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const RegisterScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register Screen - Coming Soon</Text>
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
