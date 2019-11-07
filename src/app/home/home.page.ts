import { Component } from '@angular/core';
import { Boletim } from '../models/boletim.model';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { BoletimService } from '../services/boletim.service';
import { CommentsService } from '../services/comments.service';


import { ChangeDetectorRef } from '@angular/core'




const moment = require('moment');

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public userLike: boolean = true;
  public userDislike: boolean = false;
  public searchedBoletimList: Boletim[];

  private loggedUser: User;
  private boletimList: Boletim[];



  async ngOnInit() {
    this.loggedUser = await this.authService.getLoggedUser();
    this.boletimList = await this.boletimService.getBoletimListByUser(this.loggedUser);
    for(let boletim of this.boletimList) {
      boletim.comment_quantity = boletim.commentList.length;
    }
    this.searchedBoletimList = this.boletimList;
  }

  async ionViewWillEnter() {
    this.searchedBoletimList = await this.boletimService.getBoletimListByUser(this.loggedUser);
    for(let boletim of this.boletimList) {
      boletim.comment_quantity = boletim.commentList.length;
    }
  }
  constructor(private router: Router,
    private authService: AuthService,
    private boletimService: BoletimService,
    private commentsService: CommentsService,
    ) {


  };

  getUserLike(boletim): boolean {
    // let usersLikes: String[] = boletim.likes.usernameList;
    // return usersLikes.includes(this.username);
    return true;
  };

  getUserDislike(boletim): boolean {
    // let usersDislikes: String[] = boletim.dislikes.usernameList;
    // return usersDislikes.includes(this.username);
    return false;
  };

  /**
    * Registra um like do usuário no sistema fazendo as modificações necessárias
    * 
    * @param boletim a instancia boletim em interação com o usuário
   */
  registerUserLike(boletim) {
    //Usario deu like no boletim
    if (this.getUserLike(boletim)) {
      return;
    }
    // Usuario deu dislike no boletim
    else if (this.getUserDislike(boletim)) {
      // Removo o usuário da lista de dislikes, diminui-se numero de dislikes
      let userDislikes: String[] = boletim.dislikes.usernameList;
      let index: number = userDislikes.indexOf(this.loggedUser.username);
      boletim.dislikes.usernameList.splice(index, 1);
      boletim.dislikes.quantity--;

      // Movo para lista de likes, incrementa-se numero de likes
      boletim.likes.usernameList.push(this.loggedUser.username);
      boletim.likes.quantity++;
    }
    //Usuario nao deu like nem dislike no boletim
    else {
      //insiro o usuário na lista de likes
      boletim.likes.usernameList.push(this.loggedUser.username);
      boletim.likes.quantity++;
    }
    return;
  };

  /**
   * Registra um dislike do usuário no sistema fazendo as modificações necessárias
   * 
   * @param boletim a instancia boletim em interação com o usuário
   */
  registerUserDislike(boletim) {
    //Usario deu like no boletim
    if (this.getUserLike(boletim)) {
      // Removo o usuário da lista de likes, diminui-se o numero de likes
      let userLikes: String[] = boletim.likes.usernameList;
      let index: number = userLikes.indexOf(this.loggedUser.username);
      boletim.likes.usernameList.splice(index, 1);
      boletim.likes.quantity--;

      // Movo para lista de dislikes, incrementa-se o numero de dislikes
      boletim.dislikes.usernameList.push(this.loggedUser.username);
      boletim.dislikes.quantity++;
    }
    // Usuario deu dislike no boletim
    else if (this.getUserDislike(boletim)) {
      return;
    }
    //Usuario nao deu like nem dislike no boletim
    else {
      //insiro o usuário na lista de dislikes
      boletim.dislikes.usernameList.push(this.loggedUser.username);
      boletim.dislikes.quantity++;
    }
    return;
  };

  getImageUrl(boletim) {
    return `url(/assets/${boletim.publisher.initials.toLowerCase()}/${boletim.publisher.img_background})`
  };

  getIconUrl(boletim) {
    return `/assets/${boletim.publisher.initials.toLowerCase()}/${boletim.publisher.icon}`

  };

  getFormatedDateAndDiff(boletim) {
    let date: any;
    if (!boletim.when.milli) {
      date = moment(boletim.when.date, 'DD/MM/YYYY').startOf('day');
    } else {
      date = moment(boletim.when.milli);
    }

    let diffGran: string = 'minutos';
    let diff: number = moment().diff(date, 'minutes');
    if (diff > 60) {
      diff = moment().diff(date, 'hours');
      diffGran = 'horas';
    }
    if (diff > 24) {
      diff = moment().diff(date, 'days');
      diffGran = 'dias';
    }

    return ({ date: date.format('DD/MM/YYYY HH:mm'), diff: diff + ' ' + diffGran })
  };

  /**
   * Os boletins são buscados pelo título digitado pelo usuário, 
   * sendo este valor enviado pelo componente ion-searchbar
   * 
   * @param event objeto evento enviado pelo componente ion-searchbar
   */
  searchBoletim(event) {
    let searchedTitle: string = event.target.value;

    this.searchedBoletimList = this.boletimList.filter(boletim => {
      return boletim.title.toLowerCase().trim().includes(searchedTitle.toLowerCase());
    });
  }

  sortBoletim(event) {
    let sortType: string = event.target.value;
    switch (sortType) {
      case 'titulo':
        this.searchedBoletimList.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
        break;
      case 'publicador':
        this.searchedBoletimList.sort((a, b) => (a.publisher.name > b.publisher.name) ? 1 : ((b.publisher.name > a.publisher.name) ? -1 : 0));
        break;
      case 'data':
        this.searchedBoletimList.sort((a, b) => {
          let dateA: number = a.when.milli ? a.when.milli : moment(a.when.date, 'DD/MM/YYYY').valueOf();
          let dateB: number = b.when.milli ? b.when.milli : moment(b.when.date, 'DD/MM/YYYY').valueOf();
          return (dateA > dateB) ? -1 : ((dateB > dateA) ? -1 : 0)
        });
        break;
      default:
        break;

    }
  }

  goToComments(boletim) {
    this.router.navigateByUrl('home/comments/' + boletim.id);
  }

  goToDetails(boletim) {
    this.router.navigate(['home/details/:id'], { queryParams: {id: boletim.id }});
  }
}
