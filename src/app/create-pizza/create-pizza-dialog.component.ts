import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IPizza, Pizza } from '../pizza/IPizza';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-create-pizza-dialog',
  template: `
  <form (ngSubmit)="onSubmit()" class="create-pizza-form" fxLayout="column" fxLayoutGap="16px" fxFlex [formGroup]="form">
  <h2 mat-dialog-title>Create Pizza</h2>
  <mat-dialog-content>
    <mat-form-field>
      <input cdkFocusInitial matInput placeholder="Pizza name" required id="name" formControlName="name"
        name="name">
      <mat-error *ngIf="name.hasError('required')">
        Name is required
      </mat-error>
      </mat-form-field>

    <mat-form-field>
          <input matInput placeholder="Pizza description" required id="description" formControlName="description"
            name="description">
      <mat-error *ngIf="description.hasError('required')">
        Description is required
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
    '.create-pizza-form {min-width: 200px; max-width: 300px; width: 100%;}'
  ]
})
export class CreatePizzaDialogComponent implements OnInit {
  public name: FormControl;
  public description: FormControl;
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreatePizzaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public pizza: IPizza,
    private formBuilder: FormBuilder
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
    this.description = new FormControl('', Validators.required);
  }

  createForm() {
    this.form = new FormGroup({
      name: this.name,
      description: this.description
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.getModel());
    }
  }

  getModel(): IPizza {
    return new Pizza(this.name.value, this.description.value);
  }
}
