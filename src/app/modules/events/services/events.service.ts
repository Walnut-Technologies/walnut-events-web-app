import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentURL } from '../../../environments/environment';
import { Response } from '../../../interfaces/Response';
import { firstValueFrom } from "rxjs";
import { Events } from '../interfaces/events.interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private httpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });

  constructor(private http: HttpClient) { }

  async getEvents(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.get<Response<Events[]>>(`${environmentURL._URL_EVENTS}`,
          { headers: this.httpHeaders, withCredentials: false }
        )
      );

      if (response) {
        return response || [];
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }
}
