import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventEmitter, Component, Output, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITopping } from './ITopping';
import { IListItem } from '../common/IListItem';
@Component({
  selector: 'app-toppings-list',
  template: `
  <p class="mat-body-1">Toppings selected: {{toppingsList.selectedOptions.selected.length}}</p>
  <mat-selection-list #toppingsList [(ngModel)]="selectedToppingsValue"
    (ngModelChange)="selectedToppingsChange.emit(this.selectedToppingsValue)" class="pizza-toppings-list">
    <mat-list-option *ngFor="let topping of toppings | async" [value]="topping.id" [hidden]="topping.removed">
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
