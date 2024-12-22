import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextareaFormComponent } from './input-textarea-form.component';

describe.skip('InputTextareaFormComponent', () => {
  let component: InputTextareaFormComponent;
  let fixture: ComponentFixture<InputTextareaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextareaFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTextareaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
