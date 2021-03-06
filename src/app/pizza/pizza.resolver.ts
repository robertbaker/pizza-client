import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { PizzaService } from './pizza.service';
import { IPizza } from './IPizza';
import { ITopping } from '../topping/ITopping';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
@Injectable()
export class PizzaResolver implements Resolve<Observable<IPizza>> {
  constructor(private router: Router, private pizzaService: PizzaService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IPizza> {
    const id = +route.paramMap.get('id');
    if (id < 1) {
      this.router.navigate(['/']);
      return null;
    }

    const pizza = this.pizzaService.getPizza(id);
    pizza.pipe(
      catchError(() => {
        this.router.navigate(['/']);
        return null;
      })
    );

    return pizza;
  }
}
