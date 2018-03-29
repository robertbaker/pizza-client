import { Component, OnInit, OnDestroy } from '@angular/core';
import { IListItem } from '../common/IListItem';
import { ITopping } from '../topping/ITopping';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PizzaService } from '../pizza/pizza.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-toppings-list',
  template: `
  <p class="mat-body-1">Toppings selected: {{toppingsList.selectedOptions.selected.length}}</p>
  <mat-selection-list #toppingsList [(ngModel)]="selectedToppingsValue"
    (ngModelChange)="selectedToppingsChange.emit(this.selectedToppingsValue)" class="pizza-toppings-list">
    <mat-list-option *ngFor="let topping of toppings | async" [value]="topping.id">
      {{topping.name}}
    </mat-list-option>
  </mat-selection-list>
`,
  styles: []
})
export class ToppingListComponent implements OnInit {
  public selectedToppingsValue: number[];
  public toppings: Observable<IListItem[]>;
  @Output() selectedToppingsChange = new EventEmitter();

  @Input()
  get selectedToppings() {
    return this.selectedToppingsValue;
  }

  set selectedToppings(value) {
    this.selectedToppingsValue = value;
    this.selectedToppingsChange.emit(this.selectedToppingsValue);
  }

  constructor(private route: ActivatedRoute) {
    this.toppings = this.route.data.pipe(
      map(data => {
        return data['toppings'] as ITopping[];
      })
    );
  }

  ngOnInit() {}
}
