import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToppingListComponent } from './topping-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';

describe('ToppingListComponent', () => {
  let component: ToppingListComponent;
  let fixture: ComponentFixture<ToppingListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ToppingListComponent],
        imports: [MaterialModule, RouterTestingModule, FormsModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ToppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
