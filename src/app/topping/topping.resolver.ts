import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ToppingService } from "./topping.service";
import { ITopping } from "./ITopping";

@Injectable()
export class ToppingsResolver implements Resolve<Observable<ITopping[]>> {
  constructor(private toppingService: ToppingService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ITopping[]> {
    return this.toppingService.getAllToppings();
  }
}
