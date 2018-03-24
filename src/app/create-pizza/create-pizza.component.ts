import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { IPizza, Pizza } from "../pizza/IPizza";
import { PizzaService } from "../pizza/pizza.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CreatePizzaDialogComponent } from "./create-pizza-dialog.component";

@Component({
  selector: "app-create-pizza",
  template: `
    <button mat-raised-button color="primary" (click)="openDialog()">Save as</button>
  `,
  styles: []
})
export class CreatePizzaComponent implements OnInit {
  @Output() onPizzaCreated = new EventEmitter<IPizza>();

  constructor(private dialog: MatDialog, private pizzaService: PizzaService) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(CreatePizzaDialogComponent, {
      width: "300px"
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.pizzaService
          .createPizza(data.name, data.description)
          .subscribe(pizza => {
            this.onPizzaCreated.emit(pizza);
          });
      }
    });
  }

  ngOnInit() {}
}
