import React from 'react';
import { SectionList, StyleSheet, Text } from 'react-native';
import {CocktailItem} from './CocktailItem';

const DATA = [
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"]
  }
]

export const CocktailList = props => {
  return (
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <CocktailItem item={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
      style={styles.cocktailList}
    />
  )
}

const styles = StyleSheet.create({
  cocktailList: {
    padding: 20
  },
  header: {
    fontSize: 14,
    lineHeight: 16,
    color: '#7E7E7E',
    marginBottom: 20
  }
})
