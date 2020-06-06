import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const MyAppText = ({ children, style = {} }) => {
  return (
    <Text style={[styles.text, style]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 19,
    color: '#7E7E7E'
  }
})