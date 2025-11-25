import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl; // ejemplo: http://localhost:8080/api

  // 1. Solicitar signed URL
  getSignedUrl(filename: string, contentType: string) {
    return this.http.post<any>(`${this.baseUrl}/uploads/signed-url`, {
      filename,
      contentType
    });
  }

  // 2. Subir archivo directamente a Google Storage (PUT)
  async uploadToGcs(uploadUrl: string, file: File) {
    const headers = new HttpHeaders({
      'Content-Type': file.type
    });

    await firstValueFrom(
      this.http.put(uploadUrl, file, { headers, responseType: 'text' })
    );

    return true;
  }
}
