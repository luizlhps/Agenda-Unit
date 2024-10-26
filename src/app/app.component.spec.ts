import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthenticationService } from './auth/_services/authentication.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let mockAuthService: jest.Mocked<AuthenticationService>;

  beforeEach(() => {
    // Create a mock for the authentication service
    mockAuthService = {
      autoLogin: jest.fn(),
    } as unknown as jest.Mocked<AuthenticationService>;

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: AuthenticationService, useValue: mockAuthService }],
    });

    // Create an instance of the AppComponent with the mocked service
    let fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
  });

  it('must create a new instance of the AppComponent', () => {
    expect(appComponent).toBeTruthy();
  });

  it('must call autoLogin in ngOnInit', () => {
    appComponent.ngOnInit();
    expect(mockAuthService.autoLogin).toHaveBeenCalled();
  });
});
