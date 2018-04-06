import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ITopping } from '../topping/ITopping';
import { ToppingService } from '../topping/topping.service';
import { UndoService } from '../common/undo.service';

@Component({
  selector: 'app-delete-topping',
  template: `
  <button mat-icon-button (click)="deleteTopping()"><mat-icon>delete</mat-icon></button>
  `,
  styles: []
})
export class DeleteToppingComponent implements OnInit {
  constructor(
    private router: Router,
    private undoService: UndoService,
    private toppingService: ToppingService
  ) {}

  @Input() topping: ITopping;

  @Output() toppingDeleted = new EventEmitter<ITopping>();
  @Output() toppingRestored = new EventEmitter<ITopping>();
  ngOnInit() {}

  deleteTopping() {
    this.toppingDeleted.emit(this.topping);

    this.undoService.performActionWithUndo(
      `${this.topping.name} topping deleted successfully.`,
      () => {
        this.toppingService.deleteTopping(this.topping.id).subscribe(() => {
          this.toppingDeleted.emit(this.topping);
        });
      },
      () => {
        this.toppingRestored.emit(this.topping);
      }
    );
  }
}
