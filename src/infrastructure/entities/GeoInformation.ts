import * as _ from 'lodash';
import * as moment from 'moment';
import MomentToDateConverter from '../services/MomentToDateConverter';

export default class GeoInformation {
  duration: string;
  dateConverter: MomentToDateConverter;

  constructor(dateConverter, duration = '') {
    this.dateConverter = dateConverter;
    this.duration = duration;
  }

  getArrivalTime(currentTime: Date) {
    return this.dateConverter.getTimeFromDuration(this.duration, currentTime);
  }
}