import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationComponent } from './configuration.component';
import { UserService } from '../../_services/user.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
// Mock para ResizeObserver global
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe.skip('ConfigurationComponent', () => {
  let component: ConfigurationComponent;
  let fixture: ComponentFixture<ConfigurationComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationComponent], // Certifique-se de declarar o componente aqui
      providers: [UserService, provideHttpClientTesting(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurationComponent);
    userService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
