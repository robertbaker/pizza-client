import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IPizza, Pizza } from '../pizza/IPizza';
import { PizzaService } from '../pizza/pizza.service';
import { CreatePizzaDialogComponent } from './create-pizza-dialog.component';
import { PizzaToppingsService } from '../pizza-toppings/pizza-toppings.service';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-pizza',
  template: `
  <button mat-raised-button color="primary" (click)="openDialog()">Save as</button>
  `,
  styles: []
})
export class CreatePizzaComponent implements OnInit {
  @Input() selectedToppings?: number[];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private pizzaService: PizzaService,
    private pizzaToppingsService: PizzaToppingsService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePizzaDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.pizzaService
          .createPizza(data.name, data.description)
          .subscribe(pizza => {
            if (this.selectedToppings != null) {
              this.pizzaToppingsService.saveToppings(
                pizza.id,
                this.selectedToppings
              );
            }

            this.router
              .navigate([{ outlets: { detail: [pizza.id] } }])
              .then(() =>
                this.matSnackBar.open(
                  `${pizza.name} pizza created successfully.`,
                  'Dismiss',
                  {
                    duration: 2000
                  }
                )
              );
          });
      }
    });
  }

  ngOnInit() {}
}
