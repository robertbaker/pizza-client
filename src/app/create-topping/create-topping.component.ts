import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToppingService } from '../topping/topping.service';
import { ITopping } from '../topping/ITopping';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CreateToppingDialogComponent } from './create-topping-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-topping',
  template: `
<button style="width:100%" mat-button (click)="openDialog()"><mat-icon>add</mat-icon> Create Topping</button>
  `,
  styles: []
})
export class CreateToppingComponent implements OnInit {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private toppingService: ToppingService
  ) {}

  @Output() public toppingCreated: EventEmitter<ITopping>;

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateToppingDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.toppingService.createTopping(data.name).subscribe(topping => {
          this.matSnackBar.open(
            `${topping.name} topping created successfully.`,
            'Dismiss',
            {
              duration: 2000
            }
          );

          this.toppingCreated.emit(topping);
        });
      }
    });
  }

  ngOnInit() {}
}
