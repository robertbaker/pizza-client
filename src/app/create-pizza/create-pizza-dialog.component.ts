import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { IPizza, Pizza } from "../pizza/IPizza";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-create-pizza-dialog",
  template: `
  <h2 mat-dialog-title>Create Pizza</h2>
<mat-dialog-content>
  <form class="create-pizza-form" fxLayout="column">
    <mat-form-field>
      <input cdkFocusInitial matInput placeholder="Pizza name" required [(ngModel)]="name" name="name" [formControl]="nameFormControl">
      <mat-error *ngIf="nameFormControl.hasError('required')">
        Name is <strong>required</strong>
      </mat-error>
      </mat-form-field>

    <mat-form-field>
          <input matInput placeholder="Pizza description" required [(ngModel)]="description" name="description" [formControl]="nameFormControl">
      <mat-error *ngIf="descriptionFormControl.hasError('required')">
        Description is <strong>required</strong>
      </mat-error>
    </mat-form-field>
  </form>
</mat-dialog-content>
<mat-dialog-actions fxLayoutAlign="end end">
  <button mat-button mat-dialog-close  (click)="onNoClick()">Cancel</button>
  <button mat-button type="submit"  [mat-dialog-close]="getModel()">Create</button>
</mat-dialog-actions>
  `,
  styles: [
    ".create-pizza-form {min-width: 200px; max-width: 300px; width: 100%;}"
  ]
})
export class CreatePizzaDialogComponent implements OnInit {
  nameFormControl = new FormControl("", [Validators.required]);

  descriptionFormControl = new FormControl("", [Validators.required]);

  public name: string;
  public description: string;

  constructor(
    public dialogRef: MatDialogRef<CreatePizzaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public pizza: IPizza
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}

  getModel(): IPizza {
    return new Pizza(this.name, this.description);
  }
}
