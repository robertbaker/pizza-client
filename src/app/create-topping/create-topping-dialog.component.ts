import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import { ITopping, Topping } from "../topping/ITopping";

@Component({
  selector: "app-create-topping-dialog",
  template: `
  <h2 mat-dialog-title>Create Topping</h2>
<mat-dialog-content>
  <form class="create-topping-form" fxLayout="column">
    <mat-form-field>
      <input cdkFocusInitial matInput placeholder="Topping name " required [(ngModel)]="name" name="name" [formControl]="nameFormControl">
      <mat-error *ngIf="nameFormControl.hasError('required')">
        Name is <strong>required</strong>
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
    ".create-topping-form {min-width: 200px; max-width: 300px; width: 100%;}"
  ]
})
export class CreateToppingDialogComponent implements OnInit {
  nameFormControl = new FormControl("", [Validators.required]);

  descriptionFormControl = new FormControl("", [Validators.required]);

  public name: string;
  public description: string;

  constructor(
    public dialogRef: MatDialogRef<CreateToppingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public topping: ITopping
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}

  getModel(): ITopping {
    return new Topping(this.name);
  }
}
