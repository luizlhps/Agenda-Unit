import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IHeaderNavItems } from '../_interfaces/header-nav-items.interface';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';

@Component({
  selector: 'header-nav',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  @Input() items: IHeaderNavItems[] = [];
}
