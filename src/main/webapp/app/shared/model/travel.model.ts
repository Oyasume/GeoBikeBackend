import { ILocation } from 'app/shared/model/location.model';
import { IUser } from 'app/core/user/user.model';
import { IBike } from 'app/shared/model/bike.model';

export interface ITravel {
  id?: number;
  name?: string;
  locations?: ILocation[];
  user?: IUser;
  bike?: IBike;
}

export class Travel implements ITravel {
  constructor(public id?: number, public name?: string, public locations?: ILocation[], public user?: IUser, public bike?: IBike) {}
}
