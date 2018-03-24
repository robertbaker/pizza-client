import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ITopping } from "../topping/ITopping";
import { PizzaService } from "../pizza/pizza.service";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class PizzaToppingsService {
  constructor(private pizzaService: PizzaService) {}

  public saveToppings(pizzaId: number, selectedToppings: number[]) {
    let existingToppings: ITopping[];

    this.pizzaService
      .getToppingsOnPizza(pizzaId)
      .map(x => (existingToppings = x))
      .subscribe(() => {
        this.addSelectedToppings(pizzaId, selectedToppings, existingToppings);
        this.removeDeselectedToppings(
          pizzaId,
          selectedToppings,
          existingToppings
        );
      });
  }

  private addSelectedToppings(
    pizzaId: number,
    selectedToppings: number[],
    existingToppings: ITopping[]
  ) {
    selectedToppings.forEach(selectedToppingId => {
      this.addToppingIfSelected(pizzaId, selectedToppingId, existingToppings);
    });
  }
  private addToppingIfSelected(
    pizzaId: number,
    toppingId: number,
    existingToppings: ITopping[]
  ) {
    var existingTopping = existingToppings.find(
      existingTopping => existingTopping.id === toppingId
    );
    if (existingTopping === undefined) {
      this.pizzaService.addToppingToPizza(pizzaId, toppingId).subscribe();
    }
  }

  private removeDeselectedToppings(
    pizzaId: number,
    selectedToppings: number[],
    existingToppings: ITopping[]
  ) {
    existingToppings.forEach(existingTopping => {
      this.removeToppingIfDeselected(
        pizzaId,
        existingTopping.id,
        selectedToppings
      );
    });
  }

  private removeToppingIfDeselected(
    pizzaId: number,
    toppingId: number,
    selectedToppings: number[]
  ) {
    var selectedTopping = selectedToppings.find(
      selectedToppingId => selectedToppingId === toppingId
    );
    if (selectedTopping === undefined) {
      debugger;
      this.pizzaService.removeToppingFromPizza(pizzaId, toppingId).subscribe();
    }
  }
}
