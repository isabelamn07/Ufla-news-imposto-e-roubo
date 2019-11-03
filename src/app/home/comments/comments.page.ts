import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from './comments.model';
const moment  = require('moment');

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  private boletimid: number;
  public inputComment: string;

  public commentList: Comment[] = [
    {
      id: 1,
      username: "Xiripa",
      message: "Bacana! Vou me inscrever...",
      when: {
        milli:
          1572331974809,
        date: "29/10/19"
      },
      likes: {
        quantity: 2,
        usernameList: [
          "Paulo guedes",
          "Xilips"
        ]
      },
      dislikes: {
        quantity: 1,
        usernameList: [
          "Márcio nacio"
        ]
      }
    }
  ]

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.boletimid = Number(this.route.snapshot.paramMap.get('id'));
  }

  deleteComment(commentSelected) {
    this.commentList = this.commentList.filter(comment => {
      return !(comment.id === commentSelected.id);
    })
  }

  saveNewComment() {
    let newComment: any = {};
    newComment.message = this.inputComment;
    newComment.id = this.commentList.length +1;
    newComment.username = "Usuário teste";
    newComment.when = {
      milli: moment().valueOf(),
      date: moment().format('DD/MM/YYYY')
    }
    newComment = newComment as Comment;
    this.commentList.push(newComment);
  }

  getFormatedDate(comment) {
    if(!comment.when.milli) {
      return moment(comment.when.date, 'DD/MM/YYYY').startOf('day').format('DD/MM/YYYY hh:mm');
    } 
    return moment(comment.when.milli).format('DD/MM/YYYY HH:mm');
  }
}
