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
  <View style={[styles.header, !showFilterMenu && styles.mainHeader]}>
    {showFilterMenu ? FilterHeader : MainHeader}
  </View>
)
}

const styles = StyleSheet.create({
  header: {
    height: 85,
    zIndex: 2,
    paddingHorizontal: 20,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    borderBottomColor: 'white',
    elevation: 4
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