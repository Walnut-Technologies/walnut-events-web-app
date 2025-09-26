import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentURL } from '../../../environments/environment';
import { Response } from '../../../interfaces/Response';
import { firstValueFrom } from "rxjs";
import { Agency } from '../interfaces/agency.interface';
@Injectable({
  providedIn: 'root'
})
export class AgenciesService {

  private httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
  
    constructor(private http: HttpClient) { }
  
    async getAgencies(): Promise<any> {
      try {
        const response = await firstValueFrom(
          this.http.get<Response<Agency[]>>(`${environmentURL._URL_AGENCIES}`,
            { headers: this.httpHeaders, withCredentials: false }
          )
        );
  
        if (response) {
          return response || [];
        } else {
          return [];
        }
      } catch (error) {
        console.error('Error fetching agencies:', error);
        return [];
      }
    }

    async addAgency(agency: Agency): Promise<any> {
        try {
          const response = await firstValueFrom(
            this.http.post<Response<Agency>>(
              `${environmentURL._URL_AGENCIES}`,
              agency,
              { headers: this.httpHeaders, withCredentials: false }
            )
          );
          return response;
        } catch (error) {
          console.error('Error adding agency:', error);
          throw error;
        }
  }
}
