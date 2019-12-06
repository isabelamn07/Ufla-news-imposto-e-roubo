import { Component, OnInit } from '@angular/core';
import { BoletimService } from '../services/boletim.service';
import { Publisher } from '../models/publisher.model';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'querystring';
import { PublisherService } from '../services/publisher.service';
import { Publication } from '../models/publication.model';

@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.page.html',
  styleUrls: ['./publisher-details.page.scss'],
})
export class PublisherDetailsPage implements OnInit {

  public publisher: Publisher;
  public publicationList: Publication[];
  public quantityLikes: number;
  public quantityDislikes: number;
  public quantityPublications: number;
  public quantitySubscriptions: number;
  public quantityComments: number;
  private publisherid: number;

  constructor(private boletimService: BoletimService,
    private activatedRoute: ActivatedRoute,
    private publisherService: PublisherService) {
    this.activatedRoute.queryParams.subscribe(param => {
      this.publisherid = parseInt(param.id);
    })
  }

  async ngOnInit() {
    this.publisher = (await this.boletimService.getPublisherById(this.publisherid))[0];

    let { commentsQuantity, publicationsQuantity } = await this.publisherService.getPublicationsAndCommentsQuantityById(this.publisherid);
    this.quantityPublications = publicationsQuantity;
    this.quantityComments = commentsQuantity;

    this.quantitySubscriptions = await this.publisherService.getSubscriptionsQuantityById(this.publisherid);
    this.publicationList = await this.publisherService.getPubicationListById(this.publisherid);

    let { dislikes, likes } = await this.publisherService.getPublicationsLikesAndDislikesById(this.publisherid);
    this.quantityLikes = likes;
    this.quantityDislikes = dislikes;
  }


  getIconSrc() {
    if (this.publisher) {
      return (`/assets/${this.publisher.initials.toLowerCase()}/${this.publisher.icon}`);
    } else {
      return '';
    }
  }

  getPublicationBanner(publication) {
    if (publication) {
      return (`assets/${this.publisher.initials.toLowerCase()}/banners/${publication.banner}`);
    } else {
      return '';
    }
  }

}
