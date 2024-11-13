import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemConfigComponent } from './system-config.component';

describe.skip('ConfigurationComponent', () => {
  let component: SystemConfigComponent;
  let fixture: ComponentFixture<SystemConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SystemConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
