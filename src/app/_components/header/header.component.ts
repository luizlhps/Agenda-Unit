import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoSvgComponent } from '../logo/logo.component';
import { NavComponent } from './nav/nav.component';
import { IHeaderNavItems } from './_interfaces/header-nav-items.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, LogoSvgComponent, NavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  navFields: IHeaderNavItems[] = [
    {
      label: 'Início',
      path: '',
    },
    {
      label: 'Login',
      path: 'login',
    },
    {
      label: 'Registrar',
      path: 'register',
    },
  ];
}
