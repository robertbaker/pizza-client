import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { ToppingService } from './topping.service';
import { ITopping } from './ITopping';
import { Observable } from 'rxjs';

@Injectable()
export class ToppingListResolver implements Resolve<Observable<ITopping[]>> {
  constructor(private toppingService: ToppingService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ITopping[]> {
    return this.toppingService.getAllToppings();
  }
}
