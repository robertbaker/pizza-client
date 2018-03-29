export interface IPizza {
    id: number;
    name: string;
    description: string;
}

export class Pizza implements IPizza {
    public id: number;
    constructor(public name: string = null, public description: string = null) {
    }
}
