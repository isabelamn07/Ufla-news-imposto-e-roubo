import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publication } from '../models/publication.model';


const API_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private http: HttpClient) { }

  async getPublicationsQuantityById(publisherid) {
    let publicationList: Publication[] = await this.http.get<Publication[]>(`${API_URL}/publications?publisher_id=${publisherid}`).toPromise();
    return publicationList.length;
  }
  
  async getSubscriptionsQuantityById(publisherid) {
    let subscribersList: Publication[] = await this.http.get<Publication[]>(`${API_URL}/subscriptions?publisher_id=${publisherid}`).toPromise();
    return subscribersList.length;
  }

}
