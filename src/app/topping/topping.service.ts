import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ITopping, Topping } from './ITopping';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ToppingService {

  constructor(private http: HttpClient) {
  }
  // addTopping(pizzaTopping: PizzaTopping) {
  //   let body = JSON.stringify(pizzaTopping);
  //   return this.http.post(`/pizzas/${pizzaTopping.id}/toppings`, body, httpOptions);
  // }


  // deleteTopping(topping: ITopping) {
  //   return this.http.delete(`/toppings/${topping.id}`);
  // }


  getAllToppings(): Observable<ITopping[]> {
    return this.http.get<ITopping[]>(`/toppings`);
  }


  createTopping(name: string) {
    let body = JSON.stringify(new Topping(name));
    return this.http.post('/toppings', body, httpOptions);
  }

  // createTopping(topping: ITopping) {
  //   let body = JSON.stringify(topping);
  //   return this.http.post('/toppings', body, httpOptions);
  // }

}