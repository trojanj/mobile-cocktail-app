import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { MyAppText } from './MyAppText';

export class CocktailItem extends React.PureComponent {
  render() {
    return (
      <View style={styles.cocktailItem}>
        <Image 
          source={{uri: this.props.cocktailData.strDrinkThumb}} 
          style={styles.img}
        />
        <MyAppText>{this.props.cocktailData.strDrink}</MyAppText>
      </View>
    )
  }
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