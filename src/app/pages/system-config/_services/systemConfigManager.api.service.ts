import { SystemConfigManagerCompanyCreateDto } from '../_dtos/system-config-manager-company-create.dto';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemConfigManagerCompanyCreatedDto } from '../_dtos/system-config-manager-company-created.dto';
import { SystemConfigManagerApiServiceCreatedDto } from '../_dtos/system-config-manager-service-created.dto';
import { environment } from '../../../../environments/environment';
import { SystemConfigManagerApiServiceCreateDto } from '../_dtos/system-config-manager-service-create.dto';
import { INewServiceApi } from '../../../_components/new-service/_interfaces/service.api.interface';
import { SystemConfigManagerApiServiceObtainedDto } from '../_dtos/system-config-manager-service-obtained.dto';
import { SystemConfigManagerSchedulingCreatedDto } from '../_dtos/system-config-manager-scheduling-created.dto';
import { SystemConfigManagerSchedulingCreateDto } from '../_dtos/system-config-manager-scheduling-create.dto';

@Injectable({
  providedIn: 'root',
})
export class SystemConfigManagerApiService implements INewServiceApi {
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
    SystemConfigManagerApiServiceCreateDto: SystemConfigManagerApiServiceCreateDto
  ): Observable<SystemConfigManagerApiServiceCreatedDto> {
    return this.httpClient.post<SystemConfigManagerApiServiceCreatedDto>(
      `${environment.URL_API_BASE}/system-config/service`,
      SystemConfigManagerApiServiceCreateDto
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

  obtainService(): Observable<SystemConfigManagerApiServiceObtainedDto> {
    return this.httpClient.get<SystemConfigManagerApiServiceObtainedDto>(
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
