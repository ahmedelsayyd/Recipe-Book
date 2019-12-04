import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.servic';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private router: Router, private route: ActivatedRoute, private shoppingListService: ShoppingListService, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params) => {
          this.id = +params['id']
          this.recipe = this.recipeService.getRecipeByID(this.id)
        }
      )
  }

  addToShoppingList() {
    this.shoppingListService.addRecipeIngrediants(this.recipe.ingrediants);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }


  onDeletRecipe() {
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['/recipes']);
  }
}
