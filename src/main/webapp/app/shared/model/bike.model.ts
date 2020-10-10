import { IUser } from 'app/core/user/user.model';

export interface IBike {
  id?: number;
  name?: string;
  imageContentType?: string;
  image?: any;
  user?: IUser;
}

export class Bike implements IBike {
  constructor(public id?: number, public name?: string, public imageContentType?: string, public image?: any, public user?: IUser) {}
}
