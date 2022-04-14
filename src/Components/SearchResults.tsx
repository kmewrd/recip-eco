import type {RecipeInterface} from '../App';
import RecipeCard from './RecipeCard';
import FilterMenu from './FilterMenu'
import { isPropertySignature } from 'typescript';

interface SearchResultsProps {
  recipes: RecipeInterface[],
  seeRecipe: (uri: string) => void,
  healthLabels: string[],
  applyFilter: (filter: string) => void,
  filterBy: string
}

const SearchResults = ({recipes, seeRecipe, healthLabels, applyFilter, filterBy}: SearchResultsProps) => {
  let recipeCards;
  if (!filterBy) {
    recipeCards = recipes.map((recipe, index) => {
      return (
        <RecipeCard 
          key={index.toString()}
          uri={recipe.uri}
          label={recipe.label}
          images={recipe.images}
          url={recipe.url}
          yield={recipe.yield}
          dietLabels={recipe.dietLabels}
          healthLabels={recipe.healthLabels}
          calories={recipe.calories}
          mealType={recipe.mealType}
          cuisineType={recipe.cuisineType}
          seeRecipe={seeRecipe}
        />
        )
    });
  } else {
    const filteredRecipes = recipes.filter(recipe => recipe.healthLabels.includes(filterBy))
    recipeCards = filteredRecipes.map((recipe, index) => {
      return (
        <RecipeCard 
          key={index.toString()}
          uri={recipe.uri}
          label={recipe.label}
          images={recipe.images}
          url={recipe.url}
          yield={recipe.yield}
          dietLabels={recipe.dietLabels}
          healthLabels={recipe.healthLabels}
          calories={recipe.calories}
          mealType={recipe.mealType}
          cuisineType={recipe.cuisineType}
          seeRecipe={seeRecipe}
        />
        )
    });
}
  
  return (
    <section className="search-results">
      {recipeCards.length && 
        <div>
          <FilterMenu applyFilter={applyFilter} healthLabels={healthLabels}/>
          <div className='recipe-cards'>
            {recipeCards}
          </div> 
        </div>
      }
    </section>
  )
}

export default SearchResults;