import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { PizzaService } from './pizza.service';
import { IPizza } from './IPizza';
import { Observable } from 'rxjs';
@Injectable()
export class PizzaListResolver implements Resolve<Observable<IPizza[]>> {
  constructor(private pizzaService: PizzaService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IPizza[]> {
    return this.pizzaService.getAllPizzas();
  }
}
