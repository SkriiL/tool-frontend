import {Right} from './rights.model';

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  imgUrl: string;
  rights: Right;
}
