import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './_components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth/_guards/auth.guard';
import { ScheduleComponent } from './pages/schedule/schedule.component';

export const routes: Routes = [
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
    canActivate: [AuthGuard],
    path: 'system-config',
    loadChildren: () => import('./pages/system-config/system-config.routing').then((m) => m.SystemConfigRouting),
  },

  {
    path: 'schedule',
    component: ScheduleComponent,
    canActivate: [AuthGuard],
  },
];
