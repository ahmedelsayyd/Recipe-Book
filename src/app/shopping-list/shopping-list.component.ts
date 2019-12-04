import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingrediant } from '../shared/ingrediant.model';
import { ShoppingListService } from './shopping-list.servic';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingrediants: Ingrediant[]
  subscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingrediants = this.shoppingListService.getIngrediants();
    this.subscription = this.shoppingListService.ingrediantChanged.subscribe(
      (ingrediant: Ingrediant[]) => {
        this.ingrediants = ingrediant;
      }
    )
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(index) {
    this.shoppingListService.startEditing.next(index);
  }
}
