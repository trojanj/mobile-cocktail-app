import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { Header } from './src/Header';
import { CocktailSectionList } from './src/CocktailSectionList';
import axios from './src/axios/axios';
import { FilterMenu } from './src/FilterMenu';
import { FilterList } from './src/FilterList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cocktailSections: [],
      categories: [],
      loading: false,
      showFilterMenu: false,
      activeFilters: []
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
      throw new Error('Failed to load data')
    }
  }

  getCocktails = async category => {
    try {
      const response = await axios.get(`/filter.php?c=${category}`);
      return response.data.drinks.slice(0, 10)
    } catch {
      throw new Error('Failed to load data')
    }
  }

  onEndReachedHandler = async () => {
    try {
      this.setLoading();

      const category = this.state.categories[this.state.cocktailSections.length];
      if (category) {
        const cocktails = await this.getCocktails(category);

        this.setState(state => ({
          ...state,
          cocktailSections: [...state.cocktailSections, { title: category, data: cocktails }],
          loading: false
        }))
      } else {
        Alert.alert('No more cocktails!');
      }
    } catch (e) {
      Alert.alert(`Error: ${e.message}. Please try again later!`);
    }
  }

  showFilterHandler = () => {
    this.setState(state => ({ ...state, showFilterMenu: !this.state.showFilterMenu }))
  }

  pressFilterHandler = filter => {
    if (this.state.activeFilters.includes(filter)) {
      this.setState(state => ({
        ...state, 
        activeFilters: this.state.activeFilters.filter(item => item !== filter)}))
    } else {
      this.setState(state => ({
        ...state, 
        activeFilters: [...this.state.activeFilters, filter]}))
    }
  }

  async componentDidMount() {
    try {
      this.setLoading();
      const categories = await this.getCategories();
      const cocktails = await this.getCocktails(categories[0]);

      this.setState(state => ({
        ...state,
        categories,
        cocktailSections: [...state.cocktailSections, { title: categories[0], data: cocktails }],
        loading: false,
        activeFilters: categories
      }))
    } catch (e) {
      Alert.alert(`Error: ${e.message}. Please try again later!`);
      this.setState(state => ({ ...state, loading: false }))
    }
  }

  render() {
    return (
      <>
        <Header
          showFilterMenu={this.state.showFilterMenu}
          showFilterHandler={this.showFilterHandler}
        />
        {this.state.loading && !this.state.cocktailSections.length
          ? <ActivityIndicator size={60} color="#7E7E7E" />
          : <CocktailSectionList
            cocktailSections={this.state.cocktailSections}
            onEndReachedHandler={this.onEndReachedHandler}
          />}
        {this.state.showFilterMenu && !this.state.loading && <FilterMenu>
          <FilterList 
            categories={this.state.categories}
            pressFilterHandler={this.pressFilterHandler}
            activeFilters={this.state.activeFilters}
          />
        </FilterMenu>}
      </>
    )
  }
}

export default App;
