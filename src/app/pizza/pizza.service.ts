import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { IPizza, Pizza } from './IPizza';
import { IPizzaTopping, PizzaTopping } from '../pizza-toppings/pizza-toppings';
import { ITopping } from '../topping/ITopping';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PizzaService {

  constructor(private http: HttpClient) {
  }

  getAllPizzas(): Observable<IPizza[]> {
    return this.http.get<IPizza[]>(`/pizzas`);
  }

  createPizza(pizza:IPizza) {
    let body = JSON.stringify(pizza);
    return this.http.post('/pizza', body, httpOptions);
  }

  getPizza(pizzaId: number):Observable<IPizza> {
    return this.http.get<IPizza>(`/pizzas/${pizzaId}`, httpOptions);
  }

  deleteTopping(toppingId: number) {
    return this.http.delete(`/toppings/${toppingId}`);
  }

  deletePizza(pizzaId: number) {
    return this.http.delete(`/pizzas/${pizzaId}`);
  }

  getToppingsOnPizza(pizzaId: number): Observable<ITopping[]> {
    return this.http.get<ITopping[]>(`/pizzas/${pizzaId}/toppings`);
  }

  addToppingToPizza(pizzaId: number, toppingId: number) {
    this.http.post(`/pizzas/${pizzaId}/toppings?toppingId=${toppingId}`, null, httpOptions).subscribe(x => { console.log(x); });
  }

  removeToppingFromPizza(pizzaId: number, toppingId: number) {
    this.http.delete(`/pizzas/${pizzaId}/toppings/${toppingId}`).subscribe(x => { console.log(x); });
  }
}