import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatList } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { PizzaService } from "../pizza/pizza.service";
import { IListItem } from "../common/IListItem";

@Component({
  selector: "app-pizza-list",
  template: `
  <mat-nav-list>
    <mat-list-item [routerLink]="['/pizza', item.id]" [hidden]="item.removed" 
      *ngFor="let item of items | async" (click)="selectItem(item)" [ngClass]="{'selected': isSelected(item)}">
      <h4 mat-line>{{item.name}}</h4>
      <p mat-line *ngIf="item.description">{{item.description}}</p>
      <button mat-icon-button (click)="deleteItem(item)"><mat-icon>delete</mat-icon></button>
    </mat-list-item>
  </mat-nav-list>
  `,
  styles: [".selected { background-color: #dedede; }"]
})
export class PizzaListComponent implements OnInit {
  @Input() public selectedItemId: number;
  @Input() public items: Observable<IListItem[]>;
  @Output() onSelect = new EventEmitter<IListItem>();
  @Output() onDelete = new EventEmitter<IListItem>();

  constructor() {}

  ngOnInit(): void {}

  selectItem(item: IListItem) {
    this.selectedItemId = item.id;
    this.onSelect.emit(item);
  }

  deleteItem(item: IListItem) {
    this.clearSelection();
  }

  isSelected(item: IListItem): boolean {
    return this.selectedItemId == item.id;
  }

  clearSelection() {
    this.selectedItemId = undefined;
    this.onSelect.emit(null);
  }
}
