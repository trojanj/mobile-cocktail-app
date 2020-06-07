import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MyAppText } from './MyAppText';
import { FilterList } from './FilterList';

export class FilterMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategories: []
    }
  }

  pressFilterHandler = filter => {
    if (this.state.activeCategories.includes(filter)) {
      this.setState(state => ({
        activeCategories: state.activeCategories.filter(item => item !== filter)
      }))
    } else {
      this.setState(state => ({
        activeCategories: [...state.activeCategories, filter]
      }))
    }
  }

  componentDidMount() {
    this.setState({ activeCategories: this.props.activeCategories })
  }

  render() {
    return (
      <ScrollView style={styles.filterMenu}>
        <FilterList
          categories={this.props.categories}
          pressFilterHandler={this.pressFilterHandler}
          activeCategories={this.state.activeCategories}
        />
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={() => this.props.onApplyHandler(this.state.activeCategories)}
        >
          <MyAppText style={styles.text}>APPLY</MyAppText>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  filterMenu: {
    zIndex: 1,
    position: 'absolute',
    backgroundColor: 'white',
    top: 85,
    left: 0,
    right: 0,
    bottom: 0
  },
  btn: {
    flex: 1,
    backgroundColor: '#272727',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 17,
    marginHorizontal: 27,
    marginBottom: 27
  },
  text: {
    fontWeight: 'bold',
    color: 'white'
  }
})