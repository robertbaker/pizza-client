import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ITopping, Topping } from '../topping/ITopping';

@Component({
  selector: 'app-create-topping-dialog',
  template: `

<form (ngSubmit)="onSubmit()" class="create-topping-form" fxLayout="column" fxLayoutGap="16px" fxFlex [formGroup]="form">
  <h2 mat-dialog-title>Create Topping</h2>
  <mat-dialog-content>
  <mat-form-field>
        <input cdkFocusInitial matInput placeholder="Topping name" required id="name" name="name" formControlName="name">
        <mat-error *ngIf="name.hasError('required')">
          Name is required
        </mat-error>
        </mat-form-field>

  </mat-dialog-content>
  <mat-dialog-actions fxLayoutAlign="end end" fxFlex fxLayoutGap="8px">
    <button mat-button mat-dialog-close (click)="onNoClick()">Cancel</button>
    <button mat-raised-button color="primary" type="submit">Create</button>
  </mat-dialog-actions>
</form>
  `,
  styles: [
    '.create-topping-form {min-width: 200px; max-width: 300px; width: 100%;}'
  ]
})
export class CreateToppingDialogComponent implements OnInit {
  public name: FormControl;
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateToppingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public topping: ITopping
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
  }

  createForm() {
    this.form = new FormGroup({
      name: this.name
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.getModel());
    }
  }

  getModel(): ITopping {
    return new Topping(this.name.value);
  }
}
