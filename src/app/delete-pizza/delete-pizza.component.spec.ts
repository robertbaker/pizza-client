import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePizzaComponent } from './delete-pizza.component';
import { MaterialModule } from '../material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { UndoService } from '../common/undo.service';
import { PizzaService } from '../pizza/pizza.service';
import { HttpClientModule } from '@angular/common/http';

describe('DeletePizzaComponent', () => {
  let component: DeletePizzaComponent;
  let fixture: ComponentFixture<DeletePizzaComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [DeletePizzaComponent],
        providers: [UndoService, PizzaService],
        imports: [MaterialModule, RouterTestingModule, HttpClientModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
