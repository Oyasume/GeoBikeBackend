export interface IBike {
  id?: number;
  name?: string;
  imageContentType?: string;
  image?: any;
}

export class Bike implements IBike {
  constructor(public id?: number, public name?: string, public imageContentType?: string, public image?: any) {}
}
