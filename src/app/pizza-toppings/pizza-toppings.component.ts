import { Component, OnInit, Input } from "@angular/core";
import { IPizza } from "../pizza/IPizza";
import { IPizzaTopping } from "./pizza-toppings";
import { Observable } from "rxjs/Observable";
import { ToppingService } from "../topping/topping.service";
import { ITopping } from "../topping/ITopping";
import { PizzaService } from "../pizza/pizza.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import "rxjs/add/operator/switchMap";
import { IListItem } from "../common/IListItem";
@Component({
  selector: "app-pizza-toppings",
  template: `<mat-divider></mat-divider>
<div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="16px">
<div>
<p>
Toppings selected: {{toppings.selectedOptions.selected.length}}
</p></div><div>
<button mat-raised-button color="primary" (click)="saveToppings()">Save</button></div></div>
<mat-divider></mat-divider>
  <mat-selection-list #toppings [(ngModel)]="this.selectedToppings" class="pizza-toppings-list">
  <mat-list-option *ngFor="let topping of items | async" [value]="topping.id">
    {{topping.name}}
  </mat-list-option>
</mat-selection-list>
  `,
  styles: [".pizza-toppings-list { max-width:600px; }"]
})
export class PizzaToppingsComponent implements OnInit {
  public items: Observable<IListItem[]>;
  public pizzaToppings: ITopping[];
  public selectedToppings: number[] = [];
  public existingToppings: number[] = [];
  private _pizzaId: number;

  constructor(
    private route: ActivatedRoute,
    toppingsService: ToppingService,
    private pizzaService: PizzaService
  ) {
    this.items = toppingsService.getAllToppings();
  }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) =>
      this.pizzaService
        .getToppingsOnPizza(+params.get("id"))
        .map(data => this.selectToppings(data))
    );
  }

  get pizzaId(): number {
    return this._pizzaId;
  }

  @Input()
  set pizzaId(pizzaId: number) {
    this._pizzaId = pizzaId;

    if (pizzaId != undefined) {
      this.pizzaService
        .getToppingsOnPizza(pizzaId)
        .map(data => this.selectToppings(data))
        .subscribe();
    }
  }

  selectToppings(data) {
    this.pizzaToppings = data;

    this.selectedToppings = [];
    this.items.forEach(items => {
      items.forEach(item => {
        var found = this.pizzaToppings.find(topping => topping.id === item.id);
        if (found != undefined) {
          this.selectedToppings.push(found.id);
          this.existingToppings = this.selectedToppings.slice();
          this.selectedToppings = this.selectedToppings.slice();
        }
      });
    });
  }

  saveToppings() {
    this.selectedToppings.forEach(selectedToppingId => {
      var existingTopping = this.existingToppings.find(
        existingToppingId => existingToppingId === selectedToppingId
      );
      if (existingTopping === undefined) {
        this.pizzaService.addToppingToPizza(this.pizzaId, selectedToppingId);
      }
    });

    this.existingToppings.forEach(existingToppingId => {
      var existingTopping = this.selectedToppings.find(
        selectedToppingId => selectedToppingId === existingToppingId
      );
      if (existingTopping === undefined) {
        this.pizzaService.removeToppingFromPizza(
          this.pizzaId,
          existingToppingId
        );
      }
    });

    this.existingToppings = this.selectedToppings;
  }
}
