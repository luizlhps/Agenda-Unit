import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './_components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
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
    path: 'schedule',
    component: ScheduleComponent,
  },
];
