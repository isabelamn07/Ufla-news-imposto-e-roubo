import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SubscriptionService } from '../services/subscription.service';
import { User } from '../models/user.model';
import { Publisher } from '../models/publisher.model';
import { Router } from '@angular/router';
import { Subscription } from '../models/subscription.model';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {

  public searchedPublisherList: Publisher[];
  private publisherList: Publisher[];
  private publisheridListToAdd: number[] = [];
  private publisheridListToDel: number[] = [];
  private loggedUser: User;
  private userSubscriptionList: Subscription[];

  constructor(private authService: AuthService,
    private subscriptionService: SubscriptionService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) { }

  async ngOnInit() {
    this.publisherList = await this.subscriptionService.getAllPublishers();

    this.loggedUser = await this.authService.getLoggedUser();
    this.userSubscriptionList = await this.subscriptionService.getUserSubscriptionList(this.loggedUser);

    this.searchedPublisherList = this.publisherList.map(publisher => {
      publisher.selected = false;
      for (let userSubscription of this.userSubscriptionList) {
        if (userSubscription.publisher_id === publisher.id) publisher.selected = true;
      }
      return publisher;
    })
  }

  async ionViewWillEnter() {
    this.userSubscriptionList = await this.subscriptionService.getUserSubscriptionList(this.loggedUser);
    this.publisheridListToAdd = [];
    this.publisheridListToDel = [];
  }

  searchPublisher(event) {
    let searchedInitial: string = event.target.value.toLowerCase();
    this.searchedPublisherList = this.publisherList.filter(publisher => {
      return publisher.initials.toLowerCase().trim().includes(searchedInitial);
    })
  }

  checkSelection(publisher) {
    if (publisher.selected) {
      // Em casos que o usuário deseleciona e seleciona o mesmo publicador
      let indexDel = this.publisheridListToDel.indexOf(publisher.id);
      if (indexDel >= 0) {
        this.publisheridListToDel.splice(indexDel, 1);
      }
      else this.publisheridListToAdd.push(publisher.id)
    } else {
      // Em casos que o usuário seleciona e deseleciona o mesmo publicador
      let indexAdd = this.publisheridListToAdd.indexOf(publisher.id);
      if (indexAdd >= 0) {
        this.publisheridListToAdd.splice(indexAdd, 1);
      }
      else this.publisheridListToDel.push(publisher.id);
    }
  }

  async save() {
    let loading = await this.loadingCtrl.create({
      message: "Salvando as inscrições, ...aguarde",
      duration: 2000
    });

    loading.present().then(() => {
      this.saveSubscriptions().then(() => {
        this.showSuccessSubMessage();
      })
        .catch(err => {
          this.showErrorSubMessage();
        })
    })
  }

  async saveSubscriptions() {

    if (this.publisheridListToDel.length) {
      for (let publisherid of this.publisheridListToDel) {
        for (let userSubscription of this.userSubscriptionList) {
          if (userSubscription.publisher_id === publisherid) {
            let subscriptionid = userSubscription.id;
            await this.subscriptionService.removeSubscription(subscriptionid);
          }
        }
      }
    }

    if (this.publisheridListToAdd.length) {
      for (let publisherid of this.publisheridListToAdd) {
        let newSubscription = {
          user_id: this.loggedUser.id,
          publisher_id: publisherid
        };
        await this.subscriptionService.addNewSubscription(newSubscription);
      }
    }

    this.router.navigate(['home']);
  }

  async showSuccessSubMessage() {
    let toast = await this.toastCtrl.create({
      header: "Sucesso",
      message: "As novas inscrições foram salvas com sucesso!",
      duration: 1000,
      color: "success"
    });

    return toast.present();
  }

  async showErrorSubMessage() {
    let toast = await this.toastCtrl.create({
      header: "ERRO!",
      message: "Algo inesperado ocorreu ao tentar salvar as inscrições",
      duration: 1300,
      color: "danger"
    });

    return toast.present();
  }

  getIconUrl(publisher) {
    return `/assets/${publisher.initials.toLowerCase()}/${publisher.icon}`;
  }

  cancel() {
    this.router.navigate(['home']);
  }

  navigateToPublisherDetails(publisher) {
    this.router.navigate(['publisher-details/:id'], {
      queryParams: {
        id: publisher.id
      }
    })
  }

}
