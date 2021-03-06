import React from 'react';
import { SectionList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { CocktailItem } from './CocktailItem';

export const CocktailSectionList = ({ cocktailSections, onEndReachedHandler, loading }) => {
  const renderFooter = () => {
    if (!loading) return null;

    return (
      <View style={{ marginBottom: 40 }}>
        <ActivityIndicator
          animating
          size={60}
          color="#7E7E7E"
        />
      </View>
    )
  }

  return (
    <SectionList
      sections={cocktailSections}
      keyExtractor={item => item.idDrink}
      renderItem={({ item }) => (
        <CocktailItem
          src={item.strDrinkThumb}
          title={item.strDrink}
        />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
      onEndReachedThreshold={0.01}
      onEndReached={() => onEndReachedHandler()}
      initialNumToRender={7}
      removeClippedSubviews={true}
      style={styles.cocktailList}
      ListFooterComponent={renderFooter}
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
