
import { Injectable } from "@angular/core";
import { PizzaService } from "../pizza/pizza.service";
import { Observer } from "rxjs/Observer";
import { IPizza } from "../pizza/IPizza";
import { Observable } from "rxjs/Observable";
import { ITopping } from "../topping/ITopping";
import { IPizzaTopping } from "../pizza-toppings/pizza-toppings";

@Injectable()
export class ManagePizzaService {

    public pizzas: Observable<IPizza[]>;
    public toppings: Observable<ITopping[]>;

    constructor(private pizzaService: PizzaService) {
        this.getAllPizzas();

    }

    getAllPizzas() {
        return this.pizzas = this.pizzaService.getAllPizzas();
    }

    deletePizza(pizza: IPizza) {
        this.pizzaService.deletePizza(pizza.id);
    }

    createPizza(pizza: IPizza) {
        this.pizzaService.createPizza(pizza);
    }
}