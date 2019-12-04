import { Ingrediant } from '../shared/ingrediant.model';

export class Recipe {
    name: string;
    description: string;
    imgPath: string;
    ingrediants: Ingrediant[]

    constructor(name: string, desc: string, imgPath: string, ingrediants: Ingrediant[]) {
        this.name = name;
        this.description = desc;
        this.imgPath = imgPath;
        this.ingrediants = ingrediants
    }
}