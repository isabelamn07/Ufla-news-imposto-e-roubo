import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public boletimList: Array<Object> = [
    {
      id: "1",
      name: "Pró-Reitoria de Assuntos Estudantis e Comunitários",
      initials: "PRAEC",
      img_background: "praec_predio.jpg",
      icon: "praec.svg",
      title: "Agendamento Odontológico - 25/10",
      message: "",
      likes: 4,
      dislikes: 2,
      when: {
        milli: 0,
        date: "25/10/2019"
      },
      comments: [

      ]
    }, 
    {
      id: "1",
      name: "Pró-Reitoria de Assuntos Estudantis e Comunitários",
      initials: "PRAEC",
      img_background: "praec_predio.jpg",
      icon: "praec.svg",
      title: "Agendamento Odontológico - 25/10",
      message: "",
      likes: 3,
      dislikes: 2,
      when: {
        milli: 0,
        date: "25/10/2019"
      },
      comments: [

      ]
    }
  ];


  constructor() {}

  getImageUrl(boletim) {
    return `url(/assets/${boletim.initials.toLowerCase()}/${boletim.img_background})`
  }

  getIconUrl(boletim) {
    return `/assets/${boletim.initials.toLowerCase()}/${boletim.icon}`

  }

  

}
