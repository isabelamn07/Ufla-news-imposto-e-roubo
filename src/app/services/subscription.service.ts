import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Publisher} from '../models/publisher.model';
import {User} from '../models/user.model';
import {Subscription} from '../models/subscription.model';


const API_URL = "http://localhost:3000"


@Injectable({providedIn: 'root'})
export class SubscriptionService {
    
    private httpOptions: {};

    constructor(private http: HttpClient) {
    this.httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }; }
    

    async getAllPublishers() {
        return this.http.get<Publisher[]>(`${API_URL}/publishers`).toPromise();
    }

    async getUserSubscriptionList(user: User) {
        return this.http.get<Subscription[]>(`${API_URL}/subscriptions?user_id=${user.id}`).toPromise();
    }

    async removeSubscription(subid: number) {
        return this.http.delete(`${API_URL}/subscriptions/${subid}`).toPromise();
    }

    async addNewSubscription(subscription) {
        return this.http.post(`${API_URL}/subscriptions`, subscription, this.httpOptions).toPromise();
    }
}