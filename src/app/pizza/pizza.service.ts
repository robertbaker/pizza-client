import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPizza, Pizza } from './IPizza';
import { IPizzaTopping, PizzaTopping } from '../pizza-toppings/pizza-toppings';
import { ITopping } from '../topping/ITopping';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PizzaService {
  constructor(private http: HttpClient) {}

  public getAllPizzas(): Observable<IPizza[]> {
    return this.http.get<IPizza[]>(`/pizzas`);
  }

  public createPizza(name: string, description: string): Observable<IPizza> {
    const body = JSON.stringify(new Pizza(name, description));
    return this.http.post<IPizza>('/pizzas', body, httpOptions);
  }

  public getPizza(pizzaId: number): Observable<IPizza> {
    return this.http.get<IPizza>(`/pizzas/${pizzaId}`, httpOptions);
  }

  public deleteTopping(toppingId: number) {
    return this.http.delete(`/toppings/${toppingId}`);
  }

  public deletePizza(pizzaId: number) {
    return this.http.delete(`/pizzas/${pizzaId}`);
  }

  public getToppingsOnPizza(pizzaId: number): Observable<ITopping[]> {
    return this.http.get<ITopping[]>(`/pizzas/${pizzaId}/toppings`);
  }

  public addToppingToPizza(
    pizzaId: number,
    toppingId: number
  ): Observable<IPizzaTopping> {
    return this.http.post<IPizzaTopping>(
      `/pizzas/${pizzaId}/toppings?toppingId=${toppingId}`,
      null,
      httpOptions
    );
  }

  public removeToppingFromPizza(pizzaId: number, toppingId: number) {
    return this.http.delete(`/pizzas/${pizzaId}/toppings/${toppingId}`);
  }
}
