import { AuthenticationService } from './authentication.service';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [AuthenticationService, provideHttpClientTesting(), provideHttpClient()],
    });

    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('must create a new instance of the AuthenticationService', () => {
    expect(service).toBeTruthy();
  });

  it('should logout and navigate to login', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();

    expect(service.userToken.value).toBeNull();

    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should return true if token exists in localStorage', () => {
    localStorage.setItem('token', 'some-token');

    expect(service.haveToken()).toBe(true);
  });

  it('should return false if token does not exist in localStorage', () => {
    localStorage.removeItem('token');

    expect(service.haveToken()).toBe(false);
  });
});
