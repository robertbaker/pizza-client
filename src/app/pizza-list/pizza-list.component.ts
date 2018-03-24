import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatList } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ParamMap, Params } from "@angular/router";
import { PizzaService } from "../pizza/pizza.service";
import { IListItem } from "../common/IListItem";
import { IPizza } from "../pizza/IPizza";

@Component({
  selector: "app-pizza-list",
  template: `
  <mat-nav-list>
    <mat-list-item routerLinkActive="selected" [routerLink]="['/pizza', pizza.id]" [hidden]="pizza.removed" 
      *ngFor="let pizza of pizzas | async" (click)="selectItem(pizza)" >
      <h4 mat-line>{{pizza.name}}</h4>
      <p mat-line *ngIf="pizza.description">{{pizza.description}}</p>
    </mat-list-item>
  </mat-nav-list>
  `,
  styles: [".selected { background-color: #dedede; }"]
})
export class PizzaListComponent implements OnInit {
  public pizzas: Observable<IListItem[]>;
  @Output() onSelect = new EventEmitter<IListItem>();
  @Output() onDelete = new EventEmitter<IListItem>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pizzaService: PizzaService
  ) {}

  ngOnInit(): void {
    this.pizzas = this.route.data.map(data => data["pizzas"]);
  }

  selectItem(item: IListItem) {
    this.onSelect.emit(item);
  }

  deleteItem(item: IListItem) {
    this.clearSelection();
    this.onDelete.emit(item);
  }

  clearSelection() {
    this.onSelect.emit(null);
  }
}
