import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextFormComponent } from './input-text-form.component';

describe.skip('InputTextFormComponent', () => {
  let component: InputTextFormComponent;
  let fixture: ComponentFixture<InputTextFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTextFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
