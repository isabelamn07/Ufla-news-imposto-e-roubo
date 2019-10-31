import { Component } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {Boletim} from './boletim.model';
const moment = require('moment');

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private boletimList: Array<Boletim> = [
    {
      id: "1",
      name: "Pró-Reitoria de Assuntos Estudantis e Comunitários",
      initials: "PRAEC",
      img_background: "praec-predio.jpg",
      icon: "praec.svg",
      title: "Agendamento Odontológico - 25/10",
      message: "",
      likes: 4,
      dislikes: 2,
      when: {
        milli: 1572320313125,
        date: "25/10/2019"
      },
      comments: [

      ]
    },
    {
      id: "2",
      name: "Pró-Reitoria de Graduação",
      initials: "PRG",
      img_background: "predio-pro-reitorias.jpg",
      icon: "prg.png",
      title: "Programação Oficial 2019/2 Completa, Acesse",
      message: "",
      likes: 5,
      dislikes: 80,
      when: {
        milli: 1572260313125,
        date: "28/10/2019"
      },
      comments: [

      ]
    }
  ];

  public searchedBoletimList: Boletim[];

  constructor() {
    this.searchedBoletimList = this.boletimList;
  };

  getImageUrl(boletim) {
    return `url(/assets/${boletim.initials.toLowerCase()}/${boletim.img_background})`
  };

  getIconUrl(boletim) {
    return `/assets/${boletim.initials.toLowerCase()}/${boletim.icon}`

  };

  getFormatedDateAndDiff(boletim) {
    let date: any;
    if (boletim.when.date) {
      date = moment(boletim.when.date, 'DD/MM/YYYY').startOf('day');
    } else {
      date = moment(boletim.when.mili);
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

    return ({ date: date.format('DD/MM/YYYY hh:mm'), diff: diff + ' ' + diffGran })
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
    console.log(sortType);
    switch (sortType) {
      case 'titulo':
        this.searchedBoletimList.sort( (a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
        break;
      case 'publicador':
          this.searchedBoletimList.sort( (a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        break;
      case 'data':
        this.searchedBoletimList.sort((a, b) => {
          let dateA: number = a.when.milli? a.when.milli : moment(a.when.date, 'DD/MM/YYYY').valueOf();
          let dateB: number = b.when.milli? b.when.milli : moment(b.when.date, 'DD/MM/YYYY').valueOf();
          return (dateA > dateB) ? -1 : ((dateB > dateA) ? -1 : 0)
        });
        break;
      default:
        break;

    }
  }

}
