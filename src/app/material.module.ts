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
} from "@angular/material";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ScrollDispatchModule } from "@angular/cdk/scrolling";
@NgModule({
  imports: [
    BrowserAnimationsModule,
    ScrollDispatchModule,
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
    ScrollDispatchModule,
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
