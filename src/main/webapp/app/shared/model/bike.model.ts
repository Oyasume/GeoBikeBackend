import { IUser } from 'app/core/user/user.model';

export interface IBike {
  id?: number;
  name?: string;
  imageContentType?: string;
  image?: any;
  userid?: IUser;
}

export class Bike implements IBike {
  constructor(public id?: number, public name?: string, public imageContentType?: string, public image?: any, public userid?: IUser) {}
}
