import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'https://localhost:7191/api/User/Login';
  constructor(private http: HttpClient) { }

  signIn(signInData: any) {
    return this.http.post(this.url, signInData, { observe: 'response' });
  }
}
