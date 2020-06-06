import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MyAppText } from './MyAppText';

export const FilterMenu = ({ children }) => {
  return (
    <ScrollView style={styles.filterMenu}>
      {children}
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.8}
      >
        <MyAppText style={styles.text}>APPLY</MyAppText>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  filterMenu: {
    zIndex: 1,
    position: 'absolute',
    backgroundColor: 'white',
    top: 85,
    left: 0,
    right: 0,
    bottom: 0
  },
  btn: {
    flex: 1,
    backgroundColor: '#272727',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 17,
    marginHorizontal: 27,
    marginTop: -15,
    marginBottom: 27
  },
  text: {
    fontWeight: 'bold',
    color: 'white'
  }
})