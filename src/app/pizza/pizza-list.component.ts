import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IListItem } from '../common/IListItem';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-pizza-list',
  template: `
    <mat-list-item routerLinkActive="selected" [routerLink]="[{ outlets: { detail: [pizza.id] } }]" [hidden]="pizza.removed"
      *ngFor="let pizza of pizzas | async">
      <h4 mat-line>{{pizza.name}}</h4>
      <p mat-line *ngIf="pizza.description">{{pizza.description}}</p>
      <app-delete-pizza [pizza]="pizza" (pizzaDeleted)="pizza.removed = true" (pizzaRestored)="pizza.removed=false"></app-delete-pizza>
    </mat-list-item>
  `,
  styles: ['.selected { background-color: #dedede; }']
})
export class PizzaListComponent implements OnInit {
  public pizzas: Observable<IListItem[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pizzas = this.route.data.pipe(map(data => data['pizzas']));
  }
}
