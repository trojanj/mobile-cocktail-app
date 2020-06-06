import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Drinks</Text>
      <Image 
        source={require('../assets/filter-icon.png')} 
        style={styles.img}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    shadowColor: "#000",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  text: {
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 28,
    paddingLeft: 10
  },
  img: {
    width: 30,
    height: 30
  }
})