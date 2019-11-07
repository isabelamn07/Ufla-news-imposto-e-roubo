import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Comment } from '../models/comment.model';

const API_URL = 'http://localhost:3000/comments'

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private httpOptions: {};


  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };


  }

  async getQuantityByBoletimId(boletimid): Promise<Number> {
    let commentList: Comment[] = await this.http.get<Comment[]>(`${API_URL}?publication_id=${boletimid}`).toPromise();
    if (commentList) return commentList.length;
    else return 0;
  }

  async getListByBoletimId(boletimid): Promise<Comment[]> {
    return await this.http.get<Comment[]>(`${API_URL}?publication_id=${boletimid}`).toPromise();
  }

  async deleteById(commentid: number, commentList: Comment[]) {
    for (let index in commentList) {
      if (commentList[index].id = commentid)
        return this.http.delete(`${API_URL}/${commentid}`).toPromise();
    }
  }

  async insertNewComment(newComment: Comment) {
    return this.http.post(`${API_URL}`, newComment, this.httpOptions).toPromise();
  }

  async getNextId(): Promise<number>{
    let allCommentsList: Comment[] = await this.http.get<Comment[]>(`${API_URL}`).toPromise();

    if (allCommentsList.length)
      return allCommentsList[allCommentsList.length - 1].id + 1;
    else
      return 1;
  }
}
