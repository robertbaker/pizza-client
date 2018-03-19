import { Component, OnInit } from "@angular/core";
import { IPizza, Pizza } from "../pizza/IPizza";
import { PizzaService } from "../pizza/pizza.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-create-pizza",
  template: `
  <h2 mat-dialog-title>Save this Pizza</h2>
<mat-dialog-content>
  <form class="create-pizza-form" fxLayout="column">
    <mat-form-field>
      <input matInput placeholder="Name of Pizza" required [(ngModel)]="name" name="name">
    </mat-form-field>

    <mat-form-field>
      <input matInput placeholder="Description of Pizza" required [(ngModel)]="description" name="description">
    </mat-form-field>
  </form>
</mat-dialog-content>
<mat-dialog-actions>
  <button mat-button mat-dialog-close>Cancel</button>
  <button mat-button type="submit" mat-raised-button color="primary" [mat-dialog-close]="{name:name, description:description}">Save Pizza</button>
</mat-dialog-actions>
  `,
  styles: [
    ".create-pizza-form {min-width: 150px; max-width: 300px; width: 100%;}"
  ]
})
export class CreatePizzaComponent implements OnInit {
  public name: string;
  public description: string;

  constructor(public dialog: MatDialog, private pizzaService: PizzaService) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(CreatePizzaComponent, {
      width: "250px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      if (result !== undefined) {
        this.pizzaService.createPizza(result);
      }
    });
  }

  ngOnInit() {}
}
