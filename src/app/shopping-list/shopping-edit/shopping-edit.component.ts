import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingrediant } from 'src/app/shared/ingrediant.model';
import { ShoppingListService } from '../shopping-list.servic';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false }) shoppingListForm: NgForm;

  subscription: Subscription;
  ingIndex: number;
  editedItem: Ingrediant;
  editMode: boolean = false;


  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startEditing
      .subscribe(
        (index: number) => {
          this.ingIndex = index;
          this.editMode = true
          this.editedItem = this.shoppingListService.getIngrediantIndex(index);
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })

        }
      )
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngrediant = new Ingrediant(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngrediant(this.ingIndex, this.editedItem)
    } else {
      this.shoppingListService.addNewIngrediants(newIngrediant);
    }
    this.editMode = false;
    form.reset()
  }

  onClear() {
    this.shoppingListForm.reset()
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngrediant(this.ingIndex)
    this.onClear()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
