import { Component, OnInit, Input } from "@angular/core";
import { IPizza } from "../pizza/IPizza";
import { IPizzaTopping } from "./pizza-toppings";
import { Observable } from "rxjs/Observable";
import { ToppingService } from "../topping/topping.service";
import { ITopping } from "../topping/ITopping";
import { PizzaService } from "../pizza/pizza.service";
import { ActivatedRoute, ParamMap, Router, Params } from "@angular/router";
import "rxjs/add/operator/switchMap";
import { IListItem } from "../common/IListItem";
import { PizzaToppingsService } from "./pizza-toppings.service";
@Component({
  selector: "app-pizza-toppings",
  template: `
<div fxLayout="column" class="pizza-toppings" fxLayoutGap="8px">
    <h2>{{pizza.name}}: {{pizza.description}}</h2>

    <div fxLayout="row" fxLayoutGap="16px">
      <div><p>Toppings selected: {{toppingsList.selectedOptions.selected.length}}</p></div>
      <div fxLayoutGap="16px" fxLayoutAlign="end center" fxFlex>
        <button mat-raised-button color="primary" (click)="saveToppings()">Save Pizza</button>
        <app-create-pizza (onPizzaCreated)="pizzaCreated($event)"></app-create-pizza>
      </div>
    </div>

  <mat-divider></mat-divider>
  <mat-selection-list #toppingsList [(ngModel)]="selectedToppings" class="pizza-toppings-list">
    <mat-list-option *ngFor="let topping of toppings | async" [value]="topping.id">
      {{topping.name}}
    </mat-list-option>
  </mat-selection-list>
  <app-create-topping (onToppingCreated)="toppingCreated()"></app-create-topping>
</div>
  `,
  styles: [
    ".pizza-toppings { max-width:600px; }",
    ".select-count { margin-left: 16px;}",
    ".pizza-toppings{padding:16px;}"
  ]
})
export class PizzaToppingsComponent implements OnInit {
  public toppings: Observable<IListItem[]>;
  public selectedToppings: number[] = [];
  public existingToppings: number[] = [];
  public pizza: IPizza;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    toppingsService: ToppingService,
    private pizzaService: PizzaService,
    private pizzaToppingsService: PizzaToppingsService
  ) {}

  ngOnInit() {
    this.toppings = this.route.data.map(data => data["toppings"]);
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        let pizzaId = +params.get("id");
        this.pizzaService.getPizza(pizzaId).subscribe(result => {
          this.pizza = result;
        });

        return this.pizzaService.getToppingsOnPizza(pizzaId);
      })
      .map(toppings => this.selectToppings(toppings))
      .subscribe();
  }

  selectToppings(selectedToppings: ITopping[]) {
    this.selectedToppings = [];
    this.toppings
      .forEach(items => {
        items.forEach(item => {
          var found = selectedToppings.find(topping => topping.id === item.id);
          if (found != undefined) {
            this.selectedToppings.push(found.id);
          }
        });
      })
      .then(() => {
        this.selectedToppings = this.selectedToppings.slice();
        this.existingToppings = this.selectedToppings.slice();
      });
  }

  pizzaCreated(pizza: IPizza) {
    this.pizzaToppingsService.saveToppings(pizza.id, this.selectedToppings);
    this.router.navigate(["/pizza", pizza.id]);
  }

  saveToppings() {
    this.pizzaToppingsService.saveToppings(
      this.pizza.id,
      this.selectedToppings
    );
  }
}
