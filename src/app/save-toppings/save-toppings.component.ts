import { Component, OnInit, Input } from '@angular/core';
import { PizzaToppingsService } from '../pizza-toppings/pizza-toppings.service';
import { IPizza } from '../pizza/IPizza';
import { ITopping } from '../topping/ITopping';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-save-toppings',
  template: `
  <button mat-raised-button color="primary" (click)="saveToppings()">Save Pizza</button>
  `,
  styles: []
})
export class SaveToppingsComponent implements OnInit {
  constructor(
    private pizzaToppingsService: PizzaToppingsService,
    private matSnackBar: MatSnackBar
  ) {}
  @Input() public pizza: IPizza;
  @Input() public selectedToppings: number[];
  ngOnInit() {}

  saveToppings() {
    this.pizzaToppingsService
      .saveToppings(this.pizza.id, this.selectedToppings)
      .subscribe(() => {
        this.matSnackBar.open(
          `${this.pizza.name} toppings saved successfully.`,
          'Dismiss',
          { duration: 2000 }
        );
      });
  }
}
