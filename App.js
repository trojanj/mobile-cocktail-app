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
      throw new Error('Failed to load data')
    }
  }

  getCocktails = async category => {
    try {
      const response = await axios.get(`/filter.php?c=${category}`);
      return response.data.drinks.slice(0,10)
    } catch {
      throw new Error('Failed to load data')
    }
  }

  onEndReachedHandler = async () => {
    try {
      const category = this.state.categories[this.state.cocktailSections.length];
      this.setLoading();

      if (category) {
        const cocktails = await this.getCocktails(category);

        this.setState(state => ({
          ...state,
          cocktailSections: [...state.cocktailSections, { title: category, data: cocktails }],
          loading: false
        }))
      } else if (!this.state.alert) {
          this.setState(state => ({
            ...state,
            alert: true
          }))
          Alert.alert('No more cocktails!'); 
      }
    } catch (e) {
      Alert.alert(`Error: ${e.message}. Please try again later!`);
    }
  }

  showFilterHandler = () => {
    this.setState(state => ({ ...state, showFilterMenu: !this.state.showFilterMenu }))
  }

  activeCategoriesHandler = activeCategories => {
    this.setState(state => ({
      ...state,
      activeCategories,
      showFilterMenu: false,
      alert: false
    }))
  }

  isSectionForRender() {
    return !!this.state.cocktailSections.find(section => this.state.activeCategories.includes(section.title))
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
        activeCategories: categories
      }))
    } catch (e) {
      Alert.alert(`Error: ${e.message}. Please try again later!`);
      this.setState(state => ({ ...state, loading: false }))
    }   
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.activeCategories !== this.state.activeCategories) {
      if (!this.isSectionForRender()) {
        try {
          this.setLoading();
          const cocktails = await this.getCocktails(this.state.activeCategories[0]);
          
          this.setState(state => ({
              ...state,
              cocktailSections: [...state.cocktailSections, { title: state.activeCategories[0], data: cocktails }],
              loading: false
            }))
        } catch (e) {
          Alert.alert(`Error: ${e.message}. Please try again later!`);
          this.setState(state => ({ ...state, loading: false }))
        }        
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
          this.state.loading && !this.isSectionForRender()
            ? <ActivityIndicator
              size={60}
              color="#7E7E7E"
            />
            : <CocktailSectionList
              cocktailSections={this.state.cocktailSections}
              onEndReachedHandler={this.onEndReachedHandler}
              activeCategories={this.state.activeCategories}
            />
        }
        {
          this.state.showFilterMenu
          && <FilterMenu
            categories={this.state.categories}
            activeCategoriesHandler={this.activeCategoriesHandler}
            activeCategories={this.state.activeCategories}
          />
        }
      </>
    )
  }
}

export default App;
