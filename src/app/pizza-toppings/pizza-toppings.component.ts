import { Component, OnInit, Input } from '@angular/core';
import { IPizza } from '../pizza/IPizza';
import { IPizzaTopping } from './pizza-toppings';
import { ToppingService } from '../topping/topping.service';
import { ITopping } from '../topping/ITopping';
import { PizzaService } from '../pizza/pizza.service';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';
import { IListItem } from '../common/IListItem';
import { PizzaToppingsService } from './pizza-toppings.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-pizza-toppings',
  template: `
<div fxLayout="column" class="pizza-toppings" *ngIf="pizza">
  <div fxLayout="row">
    <h2>{{pizza.name}}: {{pizza.description}}</h2>
    <div fxLayoutAlign="end center" fxFlex  fxLayoutGap="16px">
      <app-save-toppings [pizza]="pizza" [selectedToppings]="selectedToppings"></app-save-toppings>
      <app-create-pizza [selectedToppings]="selectedToppings"></app-create-pizza>
    </div>
  </div>
  <mat-divider></mat-divider>
  <app-toppings-list [(selectedToppings)]="selectedToppings"></app-toppings-list>
  <app-create-topping (toppingCreated)="onToppingCreated($event)"></app-create-topping>
</div>
<router-outlet></router-outlet>
  `,
  styles: ['.pizza-toppings { max-width:950px; padding:16px;}']
})
export class PizzaToppingsComponent implements OnInit {
  public pizza: IPizza;
  public selectedToppings: number[];
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.data.pipe(map(data => data['selectedPizza']));
    this.route.data
      .pipe(
        map(data => {
          return data['selectedToppings'] as ITopping[];
        })
      )
      .subscribe(x => {
        this.selectedToppings = [];
        const selection: number[] = [];

        x.forEach(selectedTopping => {
          selection.push(selectedTopping.id);
        });
        this.selectedToppings = selection;
      });
  }

  public onToppingCreated(topping: ITopping) {
    debugger;
    this.router.navigate([{ outlets: { detail: [this.pizza.id] } }]);
  }

  ngOnInit() {}
}
