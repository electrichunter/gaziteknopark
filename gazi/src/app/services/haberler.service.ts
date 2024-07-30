import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HaberlerService {
  private apiUrl = 'https://localhost:7272/api/Haberler'; // API URL'nizi buraya ekleyin

  constructor(private http: HttpClient) {}

  getHaberler(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteHaber(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }

  saveHaber(title: string, content: string, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Content', content);
    if (imageFile) {
      formData.append('File', imageFile);
    }

    return this.http.post<any>(this.apiUrl, formData);
  }
}
