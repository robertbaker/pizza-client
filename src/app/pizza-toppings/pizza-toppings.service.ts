import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITopping } from '../topping/ITopping';
import { PizzaService } from '../pizza/pizza.service';
import { map, filter, reduce } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PizzaToppingsService {
  constructor(private pizzaService: PizzaService) {}

  public saveToppings(pizzaId: number, selectedToppings: number[]) {
    let existingToppings: ITopping[];

    const observable = this.pizzaService
      .getToppingsOnPizza(pizzaId)
      .pipe(map(x => (existingToppings = x)));

    observable.subscribe(() => {
      this.addSelectedToppings(pizzaId, selectedToppings, existingToppings);
      this.removeDeselectedToppings(
        pizzaId,
        selectedToppings,
        existingToppings
      );
    });

    return observable;
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
    const existingTopping = existingToppings.find(
      topping => topping.id === toppingId
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
    const selectedTopping = selectedToppings.find(
      selectedToppingId => selectedToppingId === toppingId
    );
    if (selectedTopping === undefined) {
      this.pizzaService.removeToppingFromPizza(pizzaId, toppingId).subscribe();
    }
  }
}
