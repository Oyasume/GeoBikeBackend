import { Moment } from 'moment';
import { ITravel } from 'app/shared/model/travel.model';

export interface ILocation {
  id?: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  date?: Moment;
  travel?: ITravel;
}

export class Location implements ILocation {
  constructor(
    public id?: number,
    public name?: string,
    public latitude?: number,
    public longitude?: number,
    public date?: Moment,
    public travel?: ITravel
  ) {}
}
