import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { PizzaService } from '../pizza/pizza.service';
import { IListItem } from '../common/IListItem';
import { IPizza } from '../pizza/IPizza';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-pizza-list',
  template: `
  <mat-nav-list>
    <mat-list-item routerLinkActive="selected" [routerLink]="[{ outlets: { detail: [pizza.id] } }]" [hidden]="pizza.removed"
      *ngFor="let pizza of pizzas | async">
      <h4 mat-line>{{pizza.name}}</h4>
      <p mat-line *ngIf="pizza.description">{{pizza.description}}</p>
      <app-delete-pizza [pizza]="pizza"></app-delete-pizza>
    </mat-list-item>
  </mat-nav-list>
  `,
  styles: ['.selected { background-color: #dedede; }']
})
export class PizzaListComponent implements OnInit {
  public pizzas: Observable<IListItem[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pizzaService: PizzaService,
    private undoService: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.pizzas = this.route.data.pipe(map(data => data['pizzas']));
  }
}
