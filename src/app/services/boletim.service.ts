import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

import { User } from '../models/user.model';
import { Boletim } from '../models/boletim.model';
import { Subscription } from '../models/subscription.model';
import { Publisher } from '../models/publisher.model';
import { Publication } from '../models/publication.model';
import {Comment} from '../models/comment.model';

const API_URL = "http://localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class BoletimService {

  private loggedUser: User;

  constructor(private httpClient: HttpClient) {
  }

  async getBoletimListByUser(user: User): Promise <Boletim[]> {
    console.log("Chegou aqui e o user eh: " + user);

    //  let subscriptionList = await this.httpClient.get<Subscription[]>(`${API_URL}/subscriptions?user_id=${user.id}`).toPromise();
    //  console.log("Subscription eh: " + JSON.stringify(subscriptionList));
    // return  subscriptionList.map(async subs=> {
    //   return await this.httpClient.get(`${API_URL}/publications?publisher_id=${subscription.publisher_id} `).toPromise();
    // })
    let subscriptionList = await this.getUserSubscriptionList(user);
    let respBoletimList: Boletim[] = [];

    for(let subs of subscriptionList) {
      let publicationList: Publication[] =  await this.httpClient.get<Publication[]>(`${API_URL}/publications?publisher_id=${subs.publisher_id} `).toPromise()
      let publisherList: Publisher[]  = await this.getPublishersById(subs.publisher_id);
      for(let publication of  publicationList) {
        let commentList: Comment[] = []  
        commentList = await this.getCommentsByPublicationId(publication.id);
        let boletim = {...publication, publisher: publisherList[0], commentList}
        respBoletimList = respBoletimList.concat(<Boletim> boletim);
        console.log("O boletim eh: "  + JSON.stringify(boletim));
      }
    }
    // return this.httpClient.get<Subscription[]>(`${API_URL}/subscriptions?user_id=${user.id}`)
    //   .pipe(switchMap(subscription => subscription.map((subs: Subscription) => {
    //     return this.httpClient.get<Boletim[]>(`${API_URL}/publications?publisher_id=${subs.publisher_id} `)
    //   })
    //   )).toPromise();

    return respBoletimList;

  }

  async getUserSubscriptionList(user: User) {
    return this.httpClient.get<Subscription[]>(`${API_URL}/subscriptions?user_id=${user.id}`).toPromise();
  }

  async getPublishersById(publisherid: number) {
    return this.httpClient.get<Publisher[]>(`${API_URL}/publishers?id=${publisherid}`).toPromise();
  }

  async getCommentsByPublicationId(publicationid: number) {
    return this.httpClient.get<Comment[]>(`${API_URL}/comments?publication_id=${publicationid}`).toPromise();

  }
}