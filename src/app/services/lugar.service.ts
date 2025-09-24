import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Venue } from '../models/lugar.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './auth/auth.service';

@Injectable({ providedIn: 'root' })
export class LugarService {
  private apiUrl = `${environment.apiUrl}/Venues`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getLugares(): Observable<Venue[]> {
    return this.http.get<Venue[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getLugar(id: string): Observable<Venue> {
    return this.http.get<Venue>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createLugar(venue: Venue): Observable<Venue> {
    return this.http.post<Venue>(this.apiUrl, venue, { headers: this.getHeaders() });
  }

  updateLugar(id: string, venue: Venue): Observable<Venue> {
    return this.http.put<Venue>(`${this.apiUrl}/${id}`, venue, { headers: this.getHeaders() });
  }

  deleteLugar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}