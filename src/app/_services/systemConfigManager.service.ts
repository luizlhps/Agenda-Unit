import { SystemConfigManagerCompanyCreateDto } from '../_dtos/system-config-manager-company-create.dto';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemConfigManagerCompanyCreatedDto } from '../_dtos/system-config-manager-company-created.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SystemConfigManagerService {
  private httpClient = inject(HttpClient);

  constructor() {}

  registerCompany(
    systemConfigManagerCompanyCreatedDto: SystemConfigManagerCompanyCreatedDto
  ): Observable<SystemConfigManagerCompanyCreateDto> {
    return this.httpClient.post<SystemConfigManagerCompanyCreateDto>(
      `${environment.URL_API_BASE}/system-config/company`,
      systemConfigManagerCompanyCreatedDto
    );
  }

  verifyAccountConfiguration(): Observable<SystemConfigManagerCompanyCreateDto> {
    return this.httpClient.post<SystemConfigManagerCompanyCreateDto>(
      `${environment.URL_API_BASE}/system-config/company`,
      {}
    );
  }
}
