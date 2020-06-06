import React from 'react';
import { Text } from 'react-native';

export const MyAppText = ({ children }) => {
  return (
    <Text style={{
      fontSize: 16,
      lineHeight: 19,
      color: '#7E7E7E'
    }}>
      {children}
    </Text>
  )
}