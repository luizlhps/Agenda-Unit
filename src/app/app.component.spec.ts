import { AppComponent } from './app.component';
import { AuthenticationService } from './auth/_services/authentication.service';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let mockAuthService: jest.Mocked<AuthenticationService>;

  beforeEach(() => {
    // Criar um mock para o serviço de autenticação
    mockAuthService = {
      autoLogin: jest.fn(),
    } as unknown as jest.Mocked<AuthenticationService>;

    // Criar a instância do AppComponent com o serviço mockado
    appComponent = new AppComponent(mockAuthService);
  });

  it('deve criar uma nova instância do AppComponent', () => {
    expect(appComponent).toBeTruthy();
  });

  it('deve chamar autoLogin no ngOnInit', () => {
    appComponent.ngOnInit();
    expect(mockAuthService.autoLogin).toHaveBeenCalled();
  });
});
