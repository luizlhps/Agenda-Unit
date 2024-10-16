import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './_components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth/_guards/auth.guard';
import { ScheduleComponent } from './pages/scheduling/scheduling.component';

export const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: 'system-config',
    loadChildren: () => import('./pages/system-config/system-config.routing').then((m) => m.SystemConfigRouting),
  },

  {
    path: 'scheduling',
    component: ScheduleComponent,
    canActivate: [AuthGuard],
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
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
