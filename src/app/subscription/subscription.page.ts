import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SubscriptionService } from '../services/subscription.service';
import { User } from '../models/user.model';
import { Publisher } from '../models/publisher.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {

  public searchedPublisherList: Publisher[];
  private publisherList: Publisher[];
  private publisherIdListToAdd: number[];
  private publisherIdListToDel: number[];
  private loggedUser: User;

  constructor(private authService: AuthService,
    private subscriptionService: SubscriptionService,
    private router: Router) { }

  async ngOnInit() {
    this.publisherList = await this.subscriptionService.getAllPublishers();
    this.searchedPublisherList = this.publisherList;
    this.loggedUser = await this.authService.getLoggedUser();
  }

  searchPublisher(event) {
    let searchedInitial: string = event.target.value.toLowerCase();
    this.searchedPublisherList = this.publisherList.filter(publisher => {
      return publisher.initials.toLowerCase().trim().includes(searchedInitial);
    })
  }

  getIconUrl(publisher) {
    return `/assets/${publisher.initials.toLowerCase()}/${publisher.icon}`;
  }

  cancel() {
    this.router.navigate(['home']);
  }

}
