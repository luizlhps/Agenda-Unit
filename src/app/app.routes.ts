import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './_components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth/_guards/auth.guard';
import { ScheduleComponent } from './pages/scheduling/scheduling.component';
import { SidebarComponent } from './_components/sidebar/sidebar.component';

export const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: 'system-config',
    loadChildren: () => import('./pages/system-config/system-config.routing').then((m) => m.SystemConfigRouting),
  },

  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },

  {
    path: '',
    component: SidebarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'scheduling',
        component: ScheduleComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
