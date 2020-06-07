import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export const Header = ({ showFilterMenu, showFilterHandler }) => {
  const MainHeader = (<>
    <Text style={styles.text}>Drinks</Text>
    <TouchableOpacity onPress={showFilterHandler} activeOpacity={0.5}>
      <Image
        source={require('../assets/filter-icon.png')}
        style={styles.img}
      />
    </TouchableOpacity>
  </>)

  const FilterHeader = (<>
    <TouchableOpacity onPress={showFilterHandler} activeOpacity={0.5}>
      <Image
        source={require('../assets/arrow-icon.png')}
        style={styles.img}
        onPress={showFilterHandler}
      />
    </TouchableOpacity>
    <Text style={[styles.text, styles.filterText]}>Filters</Text>
  </>)

  return (
    <View style={styles.container}>
      <View style={[styles.header, !showFilterMenu && styles.mainHeader]}>
        {showFilterMenu ? FilterHeader : MainHeader}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    overflow: 'hidden', 
    paddingBottom: 5 
  },
  header: {
    height: 90,
    zIndex: 2,
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    backgroundColor: 'white'
  },
  mainHeader: {
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 28,
    paddingLeft: 10
  },
  filterText: {
    paddingLeft: 40
  },
  img: {
    width: 29,
    height: 29
  }
})