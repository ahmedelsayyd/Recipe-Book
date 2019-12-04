import { Ingrediant } from '../shared/ingrediant.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

    ingrediantChanged = new Subject<Ingrediant[]>();
    startEditing = new Subject<number>();

    private ingrediants: Ingrediant[] = [
        new Ingrediant("TOMATO", 5),
        new Ingrediant("VEGTABALES", 3)
    ]

    getIngrediants() {
        return this.ingrediants.slice();
    }

    getIngrediantIndex(index: number) {
        return this.ingrediants[index];
    }

    addNewIngrediants(ingrediant: Ingrediant) {
        this.ingrediants.push(ingrediant);
        this.ingrediantChanged.next(this.ingrediants.slice());
    }

    updateIngrediant(index: number, newIngrediant: Ingrediant) {
        this.ingrediants[index] = newIngrediant;
        this.ingrediantChanged.next(this.ingrediants.slice());
    }

    deleteIngrediant(index) {
        this.ingrediants.splice(index, 1)
        this.ingrediantChanged.next(this.ingrediants.slice());
    }

    addRecipeIngrediants(ingrediants: Ingrediant[]) {
        this.ingrediants.push(...ingrediants);
        this.ingrediantChanged.next(this.ingrediants.slice());
    }
}