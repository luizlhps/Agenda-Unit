import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './auth/_services/authentication.service';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TestService } from './_services/test.service';
import { pipe, take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'app';

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.autoLogin();
  }
}
