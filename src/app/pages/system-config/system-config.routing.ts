import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/_guards/auth.guard';
import { CompanyComponent } from './company/company.component';
import { SystemConfigComponent } from './system-config.component';
import { ServiceComponent } from './service/service.component';
import { CustomerComponent } from './customer/customer.component';

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
    path: 'service',
    component: ServiceComponent,
  },
  {
    path: 'customer',
    component: CustomerComponent,
  },
];
