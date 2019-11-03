import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  const TOKEN_KEY: string = 'auth-token';
  authState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plataform: Platform) {
    this.plataform.ready()
      .then(() => {
        this.
    })
  }

  async checkToken() {
    const res = await this.storage.get(this.TOKEN_KEY);
    if (res) {
      this.authState.next(true);
    }
  }
}

