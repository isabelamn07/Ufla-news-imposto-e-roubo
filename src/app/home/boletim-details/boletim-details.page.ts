import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publication } from 'src/app/models/publication.model';
import { BoletimService } from 'src/app/services/boletim.service';
import { Publisher } from 'src/app/models/publisher.model';
import { SectionService } from 'src/app/services/section.service';
import { Section } from 'src/app/models/section.model';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-boletim-details',
  templateUrl: './boletim-details.page.html',
  styleUrls: ['./boletim-details.page.scss'],
})
export class BoletimDetailsPage implements OnInit {

  public publication: any;
  public publisher: Publisher;
  public sectionList: Section[] = [];
  private publicationid: number;

  public disablePrevArrow = true;
  public disableNextArrow = false;

  @ViewChild(IonSlides, {static: false}) slides: IonSlides;

  slidePrev() {
    this.slides.slidePrev();
  }
  
  slideNext() {
    this.slides.slideNext();
  }

  checkNavigation() {
    let promiseBeg = this.slides.isBeginning();
    let promiseEnd = this.slides.isEnd();

    Promise.all([promiseBeg, promiseEnd]).then((data) => {
      data[0] ? this.disablePrevArrow = true : this.disablePrevArrow = false;
      data[1] ? this.disableNextArrow = true : this.disableNextArrow = false;
    });
  }

  slideInBeginning() {
     let test = this.slides.isBeginning().then(res => res);
     return test;
  }

  async slideInEnd() {
    return await this.slideInEnd();
  }

  public sliderOptions: Object = {
    initialSlide: 0,
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    autoplay: {
      delay: 5000
    }
  };


  constructor(private activatedRoute: ActivatedRoute,
    private boletimService: BoletimService,
    private sectionService: SectionService) {
    this.activatedRoute.queryParams.subscribe(param => {
      this.publicationid = parseInt(param.id);
    });
  }

  async ngOnInit() {
   // await this.slides.startAutoplay();
    this.publication = (await this.boletimService.getPublicationById(this.publicationid))[0];
    this.publisher = (await this.boletimService.getPublishersById(this.publication.publisher_id))[0];
    if(this.publication.section_order) {
      this.sectionList = await this.sectionService.getSectionListBySectionOrder(this.publication.section_order);
    } else {
      this.sectionList = [];
    }
  }


  getBannerUrl() {
    if (this.publisher) {
      return `url(/assets/${this.publisher.initials.toLowerCase()}/banners/${this.publication.banner})`
    } else {
      return '';
    }
  };

  getBannerSrc() {
    if (this.publisher) {
      return `/assets/${this.publisher.initials.toLowerCase()}/banners/${this.publication.banner}`
    } else {
      return '';
    }
  };

  
}
