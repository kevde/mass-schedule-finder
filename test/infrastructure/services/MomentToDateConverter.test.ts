import 'mocha';
import * as moment from 'moment';
import MomentToDateConverter from '../../../src/infrastructure/services/MomentToDateConverter';

describe('MomentToDateConverter', () => {
  let converter = new MomentToDateConverter();

  it('should convert arrival time from words', () => {
    // given
    const currentTime = new Date('1 Jan 1900 09:00:00')
    const firstDurationWord = '3 days 1 hour 2 mins';
    const secondDurationWord = '2 hours 1 min';
    const expectedFirstArrivalTime = moment(currentTime).add(3, 'days').add(1, 'hours').add(2, 'minutes').toDate();
    const expectedSecondArrivalTime = moment(currentTime).add(2, 'hours').add(1, 'minutes').toDate();

    // when 
    const firstArrivalTime = converter.getTimeFromDuration(firstDurationWord, currentTime);
    const secondArrivalTime = converter.getTimeFromDuration(secondDurationWord, currentTime);

    // then
    firstArrivalTime.should.be.deep.equals(expectedFirstArrivalTime);
    secondArrivalTime.should.be.deep.equals(expectedSecondArrivalTime);
  });
});