import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PizzaService } from '../pizza/pizza.service';
import { IPizza } from '../pizza/IPizza';
import { UndoService } from '../common/undo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-pizza',
  template: `
  <button mat-icon-button (click)="deletePizza()"><mat-icon>delete</mat-icon></button>
  `,
  styles: []
})
export class DeletePizzaComponent implements OnInit {
  constructor(
    private router: Router,
    private undoService: UndoService,
    private pizzaService: PizzaService
  ) {}

  @Input() pizza: IPizza;

  @Output() pizzaDeleted = new EventEmitter<IPizza>();
  @Output() pizzaRestored = new EventEmitter<IPizza>();
  ngOnInit() {}

  deletePizza() {
    this.pizzaDeleted.emit(this.pizza);
    this.undoService.performActionWithUndo(
      `${this.pizza.name} pizza deleted successfully.`,
      () => {
        this.pizzaService.deletePizza(this.pizza.id).subscribe(() => {
          this.router.navigate(['/pizza']);
        });
      },
      () => {
        this.pizzaRestored.emit(this.pizza);
      }
    );
  }
}
