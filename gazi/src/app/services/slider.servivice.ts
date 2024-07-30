import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private apiUrl = 'https://localhost:7272/api/Slider'; // Temel API URL'si

  constructor(private http: HttpClient) {}

  getSliders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  deleteSlider(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  uploadSliderImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    return this.http.post<any>(`${this.apiUrl}/addslider`, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }
} 
