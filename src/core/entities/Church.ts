import Schedule from './Schedule';
import Point from './Point';

export default class Church {
 name:string;
 address:string;
 location:Point;
 schedule?:Schedule;

  constructor(name, address, location, schedule = null) {
    this.name = name;
    this.address = address;
    this.location = location;
    this.schedule = schedule;
  }
}
