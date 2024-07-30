import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtkinliklerService {
  private baseUrl = 'https://localhost:7272/api/Etkinlikler';

  constructor(private http: HttpClient) { }

  getEtkinlikler(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

   saveEtkinlik(filePath: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/save`, filePath);
  }  

  deleteEtkinlik(etkinlikId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${etkinlikId}`);
  }
 
  updateEtkinlik(etkinlik: any): Observable<any> {
    return this.http.put(this.baseUrl, etkinlik);
  }
 
  uploadFile(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/uploadFile`, formData);
  }
}
