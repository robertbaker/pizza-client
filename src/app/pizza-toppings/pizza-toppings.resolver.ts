import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { PizzaService } from '../pizza/pizza.service';
import { ITopping } from '../topping/ITopping';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class PizzaToppingsResolver implements Resolve<Observable<ITopping[]>> {
  constructor(private router: Router, private pizzaService: PizzaService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ITopping[]> {
    const id = +route.paramMap.get('id');

    if (id < 1) {
      this.router.navigate(['/']);
      return null;
    }

    const toppings = this.pizzaService.getToppingsOnPizza(id);
    toppings.pipe(
      catchError(() => {
        this.router.navigate(['/']);
        return null;
      })
    );

    return toppings;
  }
}
