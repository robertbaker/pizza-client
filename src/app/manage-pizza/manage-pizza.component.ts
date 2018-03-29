import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { IPizza } from "../pizza/IPizza";
import { PizzaService } from "../pizza/pizza.service";
import { Observable } from "rxjs/Observable";
import { ParamMap, Router, ActivatedRoute, Params } from "@angular/router";
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
      </div>
    </mat-toolbar-row>
  </mat-toolbar>

  <mat-sidenav-container #drawerp class="manage-pizza-container" autosize >
    <mat-sidenav [(opened)]="opened" #snav [mode]="mobileQuery.matches ? 'over' : 'side'" [disableClose]="!mobileQuery.matches">
      <app-pizza-list (onSelect)="onSelect($event)" (onDelete)="onDelete($event)"></app-pizza-list>
    </mat-sidenav>
    <mat-sidenav-content fxFlex class="sidenav-container">
      <app-pizza-toppings *ngIf="selectedPizzaId"></app-pizza-toppings>
      <app-no-selection *ngIf="!selectedPizzaId"></app-no-selection>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styles: [
    ".manage-pizza-container { width:100%; height:100%; }",
    ".sidenav-container {  }"
  ]
})
export class ManagePizzaComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public opened: boolean;
  public selectedPizzaId: number;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private route: ActivatedRoute,
    private router: Router,
    private pizzaService: PizzaService
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
    this.route.params
      .map(params => (this.selectedPizzaId = +params["id"]))
      .subscribe(x => this.selectedPizzaId);
  }

  onSelect(item: IPizza) {
    if (item == null) {
      this.selectedPizzaId = null;
      return;
    }

    this.selectedPizzaId = item.id;

    if (this.mobileQuery.matches) {
      this.opened = false;
    }
    //  this.selectedPizza = item;
  }

  onDelete(item: IPizza) {
    this.pizzaService.deletePizza(item.id);
    this.selectedPizzaId = undefined;
  }
}