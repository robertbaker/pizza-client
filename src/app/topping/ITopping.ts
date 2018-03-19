export interface ITopping {
    id: number;
    name: string;
}

export class Topping implements ITopping {
    public id: number;
    constructor(public name: string) {
    }
}