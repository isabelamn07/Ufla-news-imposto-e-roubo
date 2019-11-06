import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:3000/comments'

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {

  }

  async getQuantityByBoletimId(boletimid): Promise<Number> {
    let commentList: Comment[] = await this.http.get<Comment[]>(`${API_URL}?publication_id=${boletimid}`).toPromise();
    if (commentList) return commentList.length;
    else return 0;
  }
}
