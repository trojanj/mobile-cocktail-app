import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { Header } from './src/Header';
import { CocktailSectionList } from './src/CocktailSectionList';
import axios from './src/axios/axios';
import { FilterMenu } from './src/FilterMenu';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cocktailSections: [],
      categories: [],
      loading: false,
      showFilterMenu: false,
      alert: false,
      activeCategories: []
    }
  }

  setLoading = () => {
    this.setState(state => ({ ...state, loading: true }))
  }

  getCategories = async () => {
    try {
      const response = await axios.get('/list.php?c=list');
      return response.data.drinks.map(category => category.strCategory);
    } catch {
      throw new Error('Failed to load data!')
    }
  }

  getCocktails = async category => {
    try {
      const response = await axios.get(`/filter.php?c=${category}`);
      return response.data.drinks
    } catch {
      throw new Error('Failed to load data!')
    }
  }

  onEndReachedHandler = async () => {
    try {
      const category = this.state.activeCategories[this.state.cocktailSections.length];
      this.setLoading();

      if (category) {
        const cocktails = await this.getCocktails(category);

        this.setState(state => ({
          ...state,
          cocktailSections: [...state.cocktailSections, { title: category, data: cocktails }],
          loading: false
        }))
      } else if (!category && !this.state.alert) {
        this.setState(state => ({
          ...state,
          alert: true
        }))
        Alert.alert('The end of the list. No more cocktails.');
      }
    } catch (e) {
      Alert.alert(`Error: ${e.message}`);
    }
  }

  showFilterHandler = () => {
    this.setState(state => ({ ...state, showFilterMenu: !this.state.showFilterMenu }))
  }

  onApplyHandler = activeCategories => {
    this.setState(state => ({
      ...state,
      activeCategories: state.categories.filter(category => activeCategories.includes(category)),
      showFilterMenu: false,
      alert: false,
      cocktailSections: state.cocktailSections[0].title === state.categories.find(category => activeCategories.includes(category))
        ? [state.cocktailSections[0]]
        : []
    }))
  }

  async componentDidMount() {
    try {
      this.setLoading();
      const categories = await this.getCategories();
      const cocktails = await this.getCocktails(categories[0]);

      this.setState(state => ({
        ...state,
        categories,
        cocktailSections: [{ title: categories[0], data: cocktails }],
        loading: false,
        activeCategories: categories
      }))
    } catch (e) {
      Alert.alert(`Error: ${e.message}`);
      this.setState(state => ({ ...state, loading: false }))
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.activeCategories !== this.state.activeCategories && !this.state.cocktailSections.length) {
      try {
        this.setLoading();
        const cocktails = await this.getCocktails(this.state.activeCategories[0]);

        this.setState(state => ({
          ...state,
          cocktailSections: [{ title: state.activeCategories[0], data: cocktails }],
          loading: false
        }))
      } catch (e) {
        Alert.alert(`Error: ${e.message}`);
        this.setState(state => ({ ...state, loading: false }))
      }
    }
  }

  render() {
    return (
      <>
        <Header
          showFilterMenu={this.state.showFilterMenu}
          showFilterHandler={this.showFilterHandler}
        />
        {
          this.state.loading && !this.state.cocktailSections[0]
            ? <ActivityIndicator
              size={60}
              color="#7E7E7E"
            />
            : <CocktailSectionList
              cocktailSections={this.state.cocktailSections}
              onEndReachedHandler={this.onEndReachedHandler}
            />
        }
        {
          this.state.showFilterMenu
          && <FilterMenu
            categories={this.state.categories}
            onApplyHandler={this.onApplyHandler}
            activeCategories={this.state.activeCategories}
          />
        }
      </>
    )
  }
}

export default App;
