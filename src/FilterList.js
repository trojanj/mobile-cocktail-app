import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FilterItem } from './FilterItem';

export const FilterList = ({ categories, activeCategories, pressFilterHandler }) => {
  return (
    <View style={styles.filterList}>
      {categories.map(category => (
        <FilterItem
          key={category}
          category={category}
          activeCategories={activeCategories}
          pressFilterHandler={pressFilterHandler}
        />))}
    </View>
  )
}

const styles = StyleSheet.create({
  filterList: {
    marginHorizontal: 35,
    marginBottom: 15
  }
})