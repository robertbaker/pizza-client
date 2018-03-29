import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITopping, Topping } from './ITopping';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ToppingService {
  constructor(private http: HttpClient) {}

  deleteTopping(toppingId: number) {
    return this.http.delete(`/toppings/${toppingId}`);
  }

  getAllToppings(): Observable<ITopping[]> {
    return this.http.get<ITopping[]>(`/toppings`);
  }

  createTopping(name: string): Observable<ITopping> {
    const body = JSON.stringify(new Topping(name));
    return this.http.post<ITopping>('/toppings', body, httpOptions);
  }
}
