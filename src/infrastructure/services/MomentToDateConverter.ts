import * as _ from 'lodash';
import * as moment from 'moment';

const PERIOD_KEYMAP = { day: 'days', hour: 'hours', min: 'minutes' };

export default class MomentToDateConverter {
  getTimeFromDuration(durationWord: string, currentTime: Date) {
    const currentMoment = _.transform(this.createPairs(durationWord), (moment, pair) => this.addMomentFromPair(moment, pair), moment(currentTime));
    return currentMoment.toDate();
  }

  createPairs(durationWord: string) {
    return _(durationWord).split(' ').chunk(2).map((words) => _.reverse(words)).value();
  }

  addMomentFromPair(moment, pair) {
    const period = _.findKey(PERIOD_KEYMAP, (value, key) => _.startsWith(pair[0], key));
    return moment.add(pair[1], PERIOD_KEYMAP[period]);
  }
}