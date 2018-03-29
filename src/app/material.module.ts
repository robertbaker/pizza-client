import {
  MatButtonModule,
  MatCheckboxModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatSidenavModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  imports: [
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule
  ]
})
export class MaterialModule {}
