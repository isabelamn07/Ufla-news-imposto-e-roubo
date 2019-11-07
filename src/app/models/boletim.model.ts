import {Publisher} from './publisher.model';
import {Publication} from './publication.model';
import {Comment} from './comment.model';

export interface Boletim extends Publication {
  publisher: Publisher;
  commentList: Comment[];
  comment_quantity?: number;
};

// export class Boletim implements BoletimInterface {
//   constructor(publisher: Publisher, publication: Publication) {
//     super(publication);
//     this.publisher = publisher;
//   }
// }