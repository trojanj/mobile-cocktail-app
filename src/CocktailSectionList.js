import React from 'react';
import { SectionList, StyleSheet, Text } from 'react-native';
import {CocktailItem} from './CocktailItem';

export const CocktailSectionList = ({cocktailSections, onEndReachedHandler, activeCategories}) => {
  const getRenderSections = sections => {
    return sections.filter(section => activeCategories.includes(section.title))
  }

  return (
    <SectionList
      sections={getRenderSections(cocktailSections)}
      keyExtractor={item => item.idDrink}
      renderItem={({item}) => <CocktailItem cocktailData={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
      onEndReachedThreshold={0.7}
      onEndReached={() => onEndReachedHandler()}
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
