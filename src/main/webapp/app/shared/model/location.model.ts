import { ITravel } from 'app/shared/model/travel.model';

export interface ILocation {
  id?: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  travel?: ITravel;
}

export class Location implements ILocation {
  constructor(public id?: number, public name?: string, public latitude?: number, public longitude?: number, public travel?: ITravel) {}
}
