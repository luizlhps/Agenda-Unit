import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingFormComponent } from './scheduling-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';

describe('SchedulingFormComponent', () => {
  let component: SchedulingFormComponent;
  let fixture: ComponentFixture<SchedulingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ReactiveFormsModule, SchedulingFormComponent, RouterTestingModule],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(SchedulingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
