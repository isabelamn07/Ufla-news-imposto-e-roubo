import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Comment } from '../../models/comment.model';
import { User } from 'src/app/models/user.model';
const moment = require('moment');

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  public inputComment: string;
  public commentList: Comment[];
  private boletimid: number;
  private loggedUser: User;
  // public commentList: any[] = [
  //   {
  //     id: 1,
  //     username: "Xiripa",
  //     message: "Bacana! Vou me inscrever...",
  //     when: {
  //       milli:
  //         1572331974809,
  //       date: "29/10/19"
  //     },
  //     likes: {
  //       quantity: 2,
  //       usernameList: [
  //         "Paulo guedes",
  //         "Xilips"
  //       ]
  //     },
  //     dislikes: {
  //       quantity: 1,
  //       usernameList: [
  //         "Márcio nacio"
  //       ]
  //     }
  //   }
  // ]

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private commentsService: CommentsService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
  }

  async ngOnInit() {
    this.boletimid = Number(this.route.snapshot.paramMap.get('id'));
    this.commentList = await this.commentsService.getListByBoletimId(this.boletimid);
    this.loggedUser = await this.authService.getLoggedUser();
  }

  async  deleteComment(commentSelected) {
    if (commentSelected.username !== this.loggedUser.username) {
      let toast = await this.toastCtrl.create({
        message: "Vc não pode apagar o comentário de outro usuário!",
        duration: 1000,
        color: "warning"
      });
      toast.present();
    } else {
      let confirmar: boolean;
      let alert = await this.alertCtrl.create({
        header: 'Atenção!',
        message: 'Você deseja <strong>apagar</strong> esse comentário?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'cancel-btn',
            handler: async () => {
            }
          }, {
            text: 'Confirmar',
            cssClass: 'confirm-btn',
            handler: async () => {
              await this.commentsService.deleteById(commentSelected.id, this.commentList);
              this.commentList = await this.commentsService.getListByBoletimId(this.boletimid);
            }
          }
        ]
      });

      await alert.present();
    }
    // this.commentList = this.commentList.filter(comment => {
    //   return !(comment.id === commentSelected.id);
    // })
  }

  async saveNewComment() {
    let newComment: any = {};
    newComment.message = this.inputComment;

    newComment.publication_id = this.boletimid;
    newComment.username = this.loggedUser.username;
    newComment.when = {
      milli: moment().valueOf(),
      date: moment().format('DD/MM/YYYY')
    }
    newComment.id = await this.commentsService.getNextId();
    newComment = newComment as Comment;
   let resp = await this.commentsService.insertNewComment(newComment);
    this.commentList = await this.commentsService.getListByBoletimId(this.boletimid);
  }

  getFormatedDate(comment) {
    if (!comment.when.milli) {
      return moment(comment.when.date, 'DD/MM/YYYY').startOf('day').format('DD/MM/YYYY hh:mm');
    }
    return moment(comment.when.milli).format('DD/MM/YYYY HH:mm');
  }
}
