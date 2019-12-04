import { Component, OnInit } from '@angular/core';
import { BoletimService } from '../services/boletim.service';
import { Publisher } from '../models/publisher.model';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'querystring';
import { PublisherService } from '../services/publisher.service';

@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.page.html',
  styleUrls: ['./publisher-details.page.scss'],
})
export class PublisherDetailsPage implements OnInit {

  public publisher: Publisher;
  public quantityPublications: number;
  public quantitySubscriptions: number;
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
    this.quantityPublications = await this.publisherService.getPublicationsQuantityById(this.publisherid);
    this.quantitySubscriptions = await this.publisherService.getSubscriptionsQuantityById(this.publisherid);
  }


  getIconSrc() {
    if (this.publisher) {
    return(`/assets/${this.publisher.initials.toLowerCase()}/${this.publisher.icon}`);
    } else {
      return '';
    }
  }

}
