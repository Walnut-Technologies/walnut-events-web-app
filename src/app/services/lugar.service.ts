import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venue } from '../models/lugar.model';
import { environment } from '../environments/environment';
@Injectable({ providedIn: 'root' })
export class LugarService {
  private apiUrl = `${environment.apiUrl}/Venues`;

  constructor(private http: HttpClient) {}

  createLugar(venue: Venue): Observable<Venue> {
    return this.http.post<Venue>(this.apiUrl, venue);
  }

  
  getLugares(): Observable<Venue[]> {
    return this.http.get<Venue[]>(this.apiUrl);
  }

  getLugar(id: string): Observable<Venue> {
    return this.http.get<Venue>(`${this.apiUrl}/${id}`);
  }

  updateLugar(id: string, data: Venue): Observable<Venue> {
    return this.http.put<Venue>(`${this.apiUrl}/${id}`, data);
  }

  deleteLugar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}