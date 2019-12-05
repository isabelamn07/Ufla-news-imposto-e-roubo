import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publication } from '../models/publication.model';
import { CommentsService } from './comments.service';


const API_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private http: HttpClient, private commentsService: CommentsService) { }

  async getPublicationsAndCommentsQuantityById(publisherid) {
    let publicationList: Publication[] = await this.http.get<Publication[]>(`${API_URL}/publications?publisher_id=${publisherid}`).toPromise();
    let publicationsQuantity =  publicationList.length;
    let commentsQuantity = 0;
    for(let publication of publicationList) {
      commentsQuantity +=  await this.commentsService.getQuantityByBoletimId(publication.id);
    }

    return {publicationsQuantity, commentsQuantity};
  }
  
  async getSubscriptionsQuantityById(publisherid) {
    let subscribersList: Publication[] = await this.http.get<Publication[]>(`${API_URL}/subscriptions?publisher_id=${publisherid}`).toPromise();
    return subscribersList.length;
  }

  async getPubicationListById(publisherid) {
    return this.http.get<Publication[]>(`${API_URL}/publications?publisher_id=${publisherid}`).toPromise();
  }

  async getPublicationsLikesAndDislikesById(publisherid) {
    let publicationList =  await this.http.get<Publication[]>(`${API_URL}/publications?publisher_id=${publisherid}`).toPromise();
    let likes = 0;
    let dislikes = 0;

    for(let publication of publicationList) {
      likes += publication.likes.quantity;
      dislikes += publication.dislikes.quantity;
    }

    return ({likes, dislikes});
  }

}
