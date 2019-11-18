import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Section} from '../models/section.model';

const API_URL = 'http://localhost:3000/publication_sections'

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) { }

  async getSectionListBySectionOrder(sectionidList) {
    let sectionList: Section[] = [];
    for(let sectionid of sectionidList) {
      let section = await this.http.get<Section[]>(`${API_URL}?id=${sectionid}`).toPromise();
      sectionList = sectionList.concat(section);
    }
    return sectionList;
  }
}
