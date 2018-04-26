import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { IPizza } from '../pizza/IPizza';
import { ITopping } from '../topping/ITopping';
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
  `,
  styles: ['.pizza-toppings { max-width:950px; padding:16px;}']
})
export class PizzaToppingsComponent implements OnInit {
  public pizza: IPizza;
  public selectedToppings: number[];
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.data
      .pipe(map(data => data['selectedPizza']))
      .subscribe(pizza => {
        this.pizza = pizza;
      });

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
    // TODO this isn't great, fix this.
    this.router
      .navigate(['pizza'])
      .then(() =>
        this.router.navigate([
          'pizza',
          { outlets: { detail: [this.pizza.id] } }
        ])
      );
  }

  ngOnInit() { }
}
