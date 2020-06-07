import React from 'react';
import { SectionList, StyleSheet, Text } from 'react-native';
import {CocktailItem} from './CocktailItem';

export const CocktailSectionList = ({cocktailSections, onEndReachedHandler, activeCategories}) => {

  return (
    <SectionList
      sections={cocktailSections}
      keyExtractor={item => item.idDrink}
      renderItem={({item, index}) => <CocktailItem cocktailData={item} index={index} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
      onEndReachedThreshold={0.7}
      onEndReached={() => onEndReachedHandler()}
      initialNumToRender={15}
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
