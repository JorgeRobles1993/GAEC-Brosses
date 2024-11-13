import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  private apiUrl = 'http://localhost:8000/api/send-mail'; 

  constructor(private http: HttpClient) {}

  sendMail(mailData: { to: string; subject: string; message: string }): Observable<any> {
    return this.http.post(this.apiUrl, mailData);
  }
}
