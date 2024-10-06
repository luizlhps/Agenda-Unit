import { SystemConfigManagerCompanyCreateDto } from '../_dtos/system-config-manager-company-create.dto';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemConfigManagerCompanyCreatedDto } from '../_dtos/system-config-manager-company-created.dto';
import { SystemConfigManagerServiceCreatedDto } from '../_dtos/system-config-manager-service-created.dto';
import { environment } from '../../environments/environment';
import { SystemConfigManagerServiceCreateDto } from '../_dtos/system-config-manager-service-create.dto';
import { INewServiceApi } from '../_components/new-service/_interfaces/service.api.interface';
import { SystemConfigManagerServiceObtainedDto } from '../_dtos/system-config-manager-service-obtained.dto';
import { SystemConfigManagerSchedulingCreatedDto } from '../_dtos/system-config-manager-scheduling-created.dto';
import { SystemConfigManagerSchedulingCreateDto } from '../_dtos/system-config-manager-scheduling-create.dto';

@Injectable({
  providedIn: 'root',
})
export class SystemConfigManagerService implements INewServiceApi {
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

  createService(
    systemConfigManagerServiceCreateDto: SystemConfigManagerServiceCreateDto
  ): Observable<SystemConfigManagerServiceCreatedDto> {
    return this.httpClient.post<SystemConfigManagerServiceCreatedDto>(
      `${environment.URL_API_BASE}/system-config/service`,
      systemConfigManagerServiceCreateDto
    );
  }

  createScheduling(
    systemConfigManagerSchedulingCreateDto: SystemConfigManagerSchedulingCreateDto
  ): Observable<SystemConfigManagerSchedulingCreatedDto> {
    return this.httpClient.post<SystemConfigManagerSchedulingCreatedDto>(
      `${environment.URL_API_BASE}/system-config/scheduling`,
      systemConfigManagerSchedulingCreateDto
    );
  }

  obtainService(): Observable<SystemConfigManagerServiceObtainedDto> {
    return this.httpClient.get<SystemConfigManagerServiceObtainedDto>(
      `${environment.URL_API_BASE}/system-config/service`
    );
  }

  verifyAccountConfiguration(): Observable<SystemConfigManagerCompanyCreateDto> {
    return this.httpClient.post<SystemConfigManagerCompanyCreateDto>(
      `${environment.URL_API_BASE}/system-config/company`,
      {}
    );
  }
}
