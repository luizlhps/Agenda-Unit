import { NgFor, NgIf } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { IHeaderNavItems } from '../_interfaces/header-nav-items.interface';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'header-nav',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive, SidebarModule, ButtonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: any): void {
    console.log('text');

    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;

  @Input() items: IHeaderNavItems[] = [];
}
