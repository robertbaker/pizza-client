export interface IPizzaTopping {
    id: number;
    toppingId: number;
}


export class PizzaTopping {
    constructor(public id: number, public toppingId: number) {
    }
}