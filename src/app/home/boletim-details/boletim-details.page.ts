import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publication } from 'src/app/models/publication.model';
import { BoletimService } from 'src/app/services/boletim.service';
import { Publisher } from 'src/app/models/publisher.model';

@Component({
  selector: 'app-boletim-details',
  templateUrl: './boletim-details.page.html',
  styleUrls: ['./boletim-details.page.scss'],
})
export class BoletimDetailsPage implements OnInit {

  public publication: any;
  public publisher: Publisher;
  private publicationid: number;

  constructor(private activatedRoute: ActivatedRoute, private boletimService: BoletimService) {
    this.activatedRoute.queryParams.subscribe(param=> {
      this.publicationid = parseInt(param.id);
    });
  }
  
  async ngOnInit() {
    this.publication = (await this.boletimService.getPublicationById(this.publicationid))[0];
    this.publisher = (await this.boletimService.getPublishersById(this.publication.publisher_id))[0];
  }


  getBannerUrl() {
    if(this.publisher) {
      return `url(/assets/${this.publisher.initials.toLowerCase()}/${this.publication.banner})`
    } else {
      return '';
    }
  };


}
