import Schedule from './Schedule';
import Point from './Point';
import * as _ from 'lodash'

export default class Church {
  name: string;
  address: string;
  location: Point;
  schedule ? : Schedule[];
  arrivalTime ? : Date;

  constructor(name, address, location) {
    this.name = name;
    this.address = address;
    this.location = location;
    this.schedule = [];
  }

  addSchedule(schedule) {
    this.schedule.push(schedule);
  }

  withArrivalTime(arrivalTime) {
    this.arrivalTime = arrivalTime;
    return this;
  }

  hasSchedule(startTime) {
    return _.some(this.schedule, ['startTime', startTime]);
  }


  static parse(rawChurch) {
    const x = _.get(rawChurch, 'location.x');
    const y = _.get(rawChurch, 'location.y');
    return new Church(rawChurch.name, rawChurch.address, new Point(x,y));
  }
}