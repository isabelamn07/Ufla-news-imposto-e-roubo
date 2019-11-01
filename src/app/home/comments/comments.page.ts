import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  private boletimid: number;

  public commentList: Object[] = [
    {
      "username": "Xiripa",
      "message": "Bacana! Vou me inscrever..."
      },
      {
      "username": "Márciano de Nepomuceno",
      "message": "Esse evento cresce todo ano, deve estar chamando bastante atenção do mercado!"
      },
      {
      "username": "Paulo Guedes",
      "message": "Não gostei, eles programaram o evento na semana da minha viagem ò_ó"
      }
  ]

  constructor(private route: ActivatedRoute) { 

  }

  ngOnInit() {
    this.boletimid = Number(this.route.snapshot.paramMap.get('id'));
  }


}
