import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { IPizza } from "../pizza/IPizza";
import { PizzaService } from "../pizza/pizza.service";
import { Observable } from "rxjs/Observable";
import { ParamMap, Router, ActivatedRoute } from "@angular/router";
import { MediaMatcher } from "@angular/cdk/layout";

@Component({
  selector: "app-manage-pizza",
  template: `
  <mat-toolbar color="primary">
    <mat-toolbar-row>
      <div fxFlex fxLayout="row" fxLayoutGap="8px" fxLayoutAlign="start center">
        <button class="sidenav-toggle" mat-icon-button (click)="opened = !opened" [fxShow]="mobileQuery.matches">
          <mat-icon>menu</mat-icon>
        </button>
      <div><span>Pizza Place</span></div>
        <nav><button routerLink="/create-topping" mat-button>Create Topping</button></nav>
      </div>
    </mat-toolbar-row>
  </mat-toolbar>

  <mat-sidenav-container class="manage-pizza-container" autosize>
    <mat-sidenav [(opened)]="opened" #snav [mode]="mobileQuery.matches ? 'over' : 'side'" [disableClose]="!mobileQuery.matches">
      <app-pizza-list [items]="pizzas" [selectedItemId]="selectedPizzaId" (onSelect)="onSelect($event)" (onDelete)="onDelete($event)"></app-pizza-list>
    </mat-sidenav>
    <mat-sidenav-content fxFlex fxLayoutGap="16px" class="sidenav-container">
      <app-pizza-toppings [pizzaId]="selectedPizzaId"  *ngIf="selectedPizzaId"></app-pizza-toppings>
      <app-no-selection *ngIf="!selectedPizzaId"></app-no-selection>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styles: [
    ".manage-pizza-container { width:100%; height:100%; }",
    ".sidenav-container { padding:0 16px; }"
  ]
})
export class ManagePizzaComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public opened: boolean;
  public selectedPizzaId: number;
  public pizzas: Observable<IPizza[]>;
  constructor(
    private pizzaService: PizzaService,
    private route: ActivatedRoute,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
      this.opened = !this.mobileQuery.matches;
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.opened = !this.mobileQuery.matches;
    this.pizzas = this.route.paramMap.switchMap((params: ParamMap) => {
      let pizzaId = +params.get("id");
      if (pizzaId > 0) {
        this.pizzaService.getPizza(pizzaId).subscribe(x => {
          this.selectedPizzaId = pizzaId;
        });
      }

      this.pizzas = this.pizzaService.getAllPizzas();
      return this.pizzas;
    });
  }

  onSelect(item) {
    this.selectedPizzaId = item.id;

    if (this.mobileQuery.matches) {
      this.so;
    }
    //  this.selectedPizza = item;
  }

  onDelete(item) {
    this.pizzaService.deletePizza(item.id);
    this.selectedPizzaId = undefined;
  }
}
