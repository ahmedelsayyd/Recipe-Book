import { Recipe } from './recipe.model';
import { Ingrediant } from '../shared/ingrediant.model';
import { Subject } from 'rxjs';

export class RecipeService {

    recipeChanges = new Subject<Recipe[]>();

    private recipes: Recipe[] = [new Recipe("pitza", "A slice of delisios pitza",
        "https://www.maxpixel.net/static/photo/1x/Comisa-Healthy-Tomato-Recipe-2930786.jpg",
        [new Ingrediant('tomato', 5), new Ingrediant('chekien', 1)]),

    new Recipe("Pasta", "pasta with white sous and extra salt",
        "https://www.maxpixel.net/static/photo/1x/Tomato-Sauce-Pasta-Tomatoes-Italian-Spaghetti-1392266.jpg",
        [new Ingrediant('meat', 7), new Ingrediant('vegtables', 2)])
    ]

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanges.next(this.recipes.slice())
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeByID(index) {
        return this.recipes[index];
    }

    addNewRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanges.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanges.next(this.recipes.slice())

    }

    deleteRecipe(index) {
        this.recipes.splice(index, 1)
        this.recipeChanges.next(this.recipes.slice())
    }


}