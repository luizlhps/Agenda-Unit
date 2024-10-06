import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/_guards/auth.guard';
import { CompanyComponent } from './company/company.component';
import { SystemConfigComponent } from './system-config.component';
import { SchedulingComponent } from './system/scheduling.component';

export const SystemConfigRouting: Routes = [
  {
    path: '',
    component: SystemConfigComponent,
  },

  {
    path: 'company',
    component: CompanyComponent,
  },
  {
    path: 'scheduling',
    component: SchedulingComponent,
  },
];
