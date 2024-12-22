import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CalendarComponent } from '@schedule-x/angular';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MenuModule } from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { TabViewModule } from 'primeng/tabview';
import { AuthenticationService } from '../../../auth/_services/authentication.service';
import { LogoSvgComponent } from '../logo/logo.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    LogoSvgComponent,
    CalendarModule,
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    CommonModule,
    TabViewModule,
    MenuModule,
    RouterLinkActive,
    RouterLink,
    RouterModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  private authService = inject(AuthenticationService);
  private breakpointObserver = inject(BreakpointObserver);
  private cdr = inject(ChangeDetectorRef);

  protected menuItems: MenuItem[] | undefined;
  protected mobile: boolean = false;

  sidebarVisible: boolean = true;
  firstInit: boolean = false;

  breakpoint$: any;
  ngOnInit(): void {
    this.menuItems = [
      {
        label: this.authService.userToken.value?.username,
        items: [
          {
            label: 'Sair',
            icon: 'pi pi-sign-out',
            command: () => {
              this.authService.logout();
            },
          },
        ],
      },
    ];
    this.breakpointObserver
      .observe('(max-width: 768px)')
      .pipe()
      .subscribe((result) => {
        this.mobile = result.matches;

        if (!result.matches && this.firstInit) {
          this.sidebarVisible = true;
        } else if (result.matches) {
          this.sidebarVisible = false;
        }
        this.firstInit = true;
      });
  }
}
