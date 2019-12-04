import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        })
  }

  private initForm() {

    let recipeName = '';
    let recipeimgPath = '';
    let recipeDescription = '';
    let recipeIngrediants = new FormArray([])

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeByID(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeimgPath = recipe.imgPath;

      if (recipe.ingrediants) {
        for (let ingrediant of recipe.ingrediants) {
          recipeIngrediants.push(
            new FormGroup({
              'name': new FormControl(ingrediant.name, Validators.required),
              'amount': new FormControl(ingrediant.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'recipeDescription': new FormControl(recipeDescription, Validators.required),
      'imgPath': new FormControl(recipeimgPath, Validators.required),
      'ingrediants': recipeIngrediants
    })
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['recipeDescription'],
      this.recipeForm.value['imgPath'],
      this.recipeForm.value['ingrediants']
    )
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe)

    } else {
      this.recipeService.addNewRecipe(newRecipe)
    }

    this.onCancel();
  }

  onAddIngrediant() {
    (<FormArray>this.recipeForm.get('ingrediants')).push(
      new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onDeleteIngrediant(index: number) {
    (<FormArray>this.recipeForm.get('ingrediants')).removeAt(index)
  }


}
