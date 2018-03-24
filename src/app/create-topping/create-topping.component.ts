import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ToppingService } from "../topping/topping.service";
import { ITopping } from "../topping/ITopping";
import { MatDialog } from "@angular/material";
import { CreateToppingDialogComponent } from "./create-topping-dialog.component";

@Component({
  selector: "app-create-topping",
  template: `
<button mat-button (click)="openDialog()"><mat-icon>add</mat-icon> Create Topping</button>
  `,
  styles: []
})
export class CreateToppingComponent implements OnInit {
  @Output() onToppingCreated = new EventEmitter<ITopping>();

  constructor(
    private dialog: MatDialog,
    private toppingService: ToppingService
  ) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(CreateToppingDialogComponent, {
      width: "300px"
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.toppingService.createTopping(data.name).subscribe(topping => {
          this.onToppingCreated.emit(topping);
        });
      }
    });
  }

  ngOnInit() {}
}
