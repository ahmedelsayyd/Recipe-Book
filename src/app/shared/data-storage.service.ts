import { OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService implements OnInit {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    ngOnInit() {


    }

    storeRecipe() {
        const token = this.authService.getToken()
        return this.http.put('https://ng-recipe-book-92d3f.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes())
    }

    getRecipes() {

        const token = this.authService.getToken()

        this.http.get<Recipe[]>('https://ng-recipe-book-92d3f.firebaseio.com/recipes.json?auth=' + token)
            .pipe(map((recipes: Recipe[]) => {
                for (let recipe of recipes) {
                    if (!recipe['ingrediants']) {
                        recipe['ingrediants'] = []
                    }
                }
                return recipes
            }))
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes)

                }
            )
    }
}