import { AppComponent } from './app.component';
import { AuthenticationService } from './auth/_services/authentication.service';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let mockAuthService: jest.Mocked<AuthenticationService>;

  beforeEach(() => {
    // Create a mock for the authentication service
    mockAuthService = {
      autoLogin: jest.fn(),
    } as unknown as jest.Mocked<AuthenticationService>;

    // Create an instance of the AppComponent with the mocked service
    appComponent = new AppComponent(mockAuthService);
  });

  it('must create a new instance of the AppComponent', () => {
    expect(appComponent).toBeTruthy();
  });

  it('must call autoLogin in ngOnInit', () => {
    appComponent.ngOnInit();
    expect(mockAuthService.autoLogin).toHaveBeenCalled();
  });
});
