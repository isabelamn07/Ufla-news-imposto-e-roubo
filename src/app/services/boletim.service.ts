import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { Boletim } from '../models/boletim.model';
import {Subscription} from '../models/subscription.model';


import { map, filter, switchMap, flatMap } from 'rxjs/operators'

const API_URL= "localhost:8000/"

@Injectable({
  providedIn: 'root'
})
export class BoletimService {

  private loggedUser: User;

  constructor(private authService: AuthService, private httpClient: HttpClient ) {
    authService.getLoggedUser().then(user => {
      this.loggedUser = user;
    });  
   }

   async getBoletimListByUser(): Promise<Boletim> {
    return await this.httpClient.get<Subscription>(`${API_URL}/subscriptions&user_id=${this.loggedUser.id}`)
    .pipe(switchMap(subscription => { 
       return this.httpClient.get<Boletim>(`${API_URL}/publications&publisher_id=${subscription.publisher_id} `)
    })).toPromise();
   }
  

}
