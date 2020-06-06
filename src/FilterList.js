import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FilterItem } from './FilterItem';

export const FilterList = ({ categories, activeFilters, pressFilterHandler }) => {
  return (
    <View style={styles.filterList}>
      {categories.map(category => (
        <FilterItem
          category={category}
          activeFilters={activeFilters}
          pressFilterHandler={pressFilterHandler}
        />))}
    </View>
  )
}

const styles = StyleSheet.create({
  filterList: {
    marginTop: 30,
    marginHorizontal: 35
  }
})