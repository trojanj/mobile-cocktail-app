import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { MyAppText } from './MyAppText';

export const CocktailItem = ({item}) => {
  return (
    <View style={styles.cocktailItem}>
      <Image 
        source={{uri: "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg/preview"}} 
        style={styles.img}
      />
      <MyAppText>{item}</MyAppText>
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
    width: 50,
    height: 50
  }
})