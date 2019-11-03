import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { BehaviorSubject, Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

import {User} from '../models/user.model'
import {AuthResponse} from '../models/authResponse.model';

const TOKEN_KEY: string = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_API: String= "http://localhost:8000/auth";
  authState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plataform: Platform, private http: HttpClient) {
    this.plataform.ready()
      .then(() => {
        this.checkToken();
    })
  }

  async checkToken() {
    const res = await this.storage.get(TOKEN_KEY);
    if (res) {
      this.authState.next(true);
    }
  }

  login(user: User): Promise<AuthResponse> {
    return this.http.post(`${this.AUTH_API}/login`, user).pipe(
      tap(async (res: AuthResponse) => {
        if(res.access_token) {
          await this.storage.set(TOKEN_KEY, res.access_token);
          this.authState.next(true);
        }
      })
    ).toPromise();
  }

  register(user: User): Promise<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.AUTH_API}/register`, user).pipe(
      tap(async (res: AuthResponse) => {
        if (res.access_token) {
          await this.storage.set(TOKEN_KEY, res.access_token);
          this.authState.next(true);
        }
      })
    ).toPromise();
  }
 
  async logout() {
    await this.storage.remove(TOKEN_KEY);
    this.authState.next(false);
  }

  isAuthenticated() {
    return this.authState.value;
  }
}

