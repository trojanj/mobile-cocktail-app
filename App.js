import React from 'react';
import { StyleSheet} from 'react-native';
import { Header } from './src/Header';
import { CocktailList } from './src/CocktailList';

class App extends React.Component {


  render() {
    return (
      <>
        <Header />
        <CocktailList />
      </>
    )
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
