import {Publisher} from './publisher.model';
import {Publication} from './publication.model';

export interface Boletim extends Publication {
  publisher: Publisher;
};

// export class Boletim implements BoletimInterface {
//   constructor(publisher: Publisher, publication: Publication) {
//     super(publication);
//     this.publisher = publisher;
//   }
// }