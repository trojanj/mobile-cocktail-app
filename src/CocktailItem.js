import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { MyAppText } from './MyAppText';

export const CocktailItem = ({cocktailData}) => {
  return (
    <View style={styles.cocktailItem}>
      <Image 
        source={{uri: cocktailData.strDrinkThumb}} 
        style={styles.img}
      />
      <MyAppText>{cocktailData.strDrink}</MyAppText>
    </View>
  )
}

const styles = StyleSheet.create({
  cocktailItem: {
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  img: {
    width: 100,
    height: 100,
    marginRight: 20
  }
})