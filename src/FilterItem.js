import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MyAppText } from './MyAppText';

export const FilterItem = ({category, activeFilters, pressFilterHandler}) => {
  return (
    <TouchableOpacity 
      style={styles.filterItem}
      activeOpacity={0.8}
      onPress={() => pressFilterHandler(category)}
    >
      <MyAppText>{category}</MyAppText>
      {activeFilters.includes(category) && <Image
        source={require('../assets/check-icon.png')}
        style={styles.img}
      />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 30
  },
  img: {
    marginRight: 5,
    width: 25,
    height: 18
  }
})