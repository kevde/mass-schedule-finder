import 'mocha';
import ArrivalDetector from '../../../src/core/services/ArrivalDetector';
import Church from '../../../src/core/entities/Church';
import Point from '../../../src/core/entities/Point';
import Schedule from '../../../src/core/entities/Schedule';
import Duration from '../../../src/core/entities/durations/Duration';
import ScheduleFinder from '../../../src/core/services/ScheduleFinder';

describe('ArrivalDetector', () => {
  xit('should get estimated time of arrival', () => {
    // given
    const source = new Point(10, 10);
    const destination = new Point(10.1, 10.1);
    const currentTime = new Date('1 Jan 1900 09:00:00');

    // when
    const arrivalDetector = new ArrivalDetector();
    const timeOfArrival = arrivalDetector.getEstimatedTimeOfArrival(source, destination, currentTime);

    // then
    timeOfArrival.should.be.deep.equals(timeOfArrival);
  });
});