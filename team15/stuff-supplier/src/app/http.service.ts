import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  private baseUrl = 'https://localhost:7083/api/';

  get<T>(path: string): Observable<T[]> {
    const url = this.baseUrl + path;
    return this.http.get<T[]>(url);
  }

  delete(path: string, id: number | undefined): Observable<boolean> {
    const url = `${this.baseUrl}${path}/${id}`;
    return this.http.delete<boolean>(url);
  }

  put<T>(path: string, body: any): Observable<T> {
    const url = this.baseUrl + path;
    return this.http.put<T>(url, body);
  }

  post<T>(path: string, body: any): Observable<T> {
    const url = this.baseUrl + path;
    return this.http.post<T>(url, body);
  }
}
