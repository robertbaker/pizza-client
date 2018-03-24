import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { PizzaService } from "./pizza.service";
import { IPizza } from "./IPizza";

@Injectable()
export class PizzaResolver implements Resolve<Observable<IPizza[]>> {
  constructor(private pizzaService: PizzaService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IPizza[]> {
    return this.pizzaService.getAllPizzas();
  }
}
