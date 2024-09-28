import { SystemConfigManagerCompanyCreateDto } from '../_dtos/system-config-manager-company-create.dto';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemConfigManagerCompanyCreatedDto } from '../_dtos/system-config-manager-company-created.dto';
import { SystemConfigManagerServiceCreatedDto } from '../_dtos/system-config-manager-service-created.dto';
import { environment } from '../../environments/environment';
import { SystemConfigManagerServiceCreateDto } from '../_dtos/system-config-manager-service-create.dto';

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

  createFirstService(
    systemConfigManagerServiceCreatedDto: SystemConfigManagerServiceCreatedDto
  ): Observable<SystemConfigManagerServiceCreateDto> {
    return this.httpClient.post<SystemConfigManagerServiceCreateDto>(
      `${environment.URL_API_BASE}/system-config/service`,
      systemConfigManagerServiceCreatedDto
    );
  }

  verifyAccountConfiguration(): Observable<SystemConfigManagerCompanyCreateDto> {
    return this.httpClient.post<SystemConfigManagerCompanyCreateDto>(
      `${environment.URL_API_BASE}/system-config/company`,
      {}
    );
  }
}
