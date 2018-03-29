import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteToppingComponent } from './delete-topping.component';
import { MaterialModule } from '../material.module';

describe('DeleteToppingComponent', () => {
  let component: DeleteToppingComponent;
  let fixture: ComponentFixture<DeleteToppingComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [DeleteToppingComponent],
        imports: [MaterialModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteToppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
