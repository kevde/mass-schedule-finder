import 'mocha';
import Schedule from '../../../src/core/entities/Schedule';
import Duration from '../../../src/core/entities/durations/Duration';

describe('Schedule', () => {
  let schedule;
  const START_TIME = new Date();
  const END_TIME = new Date();

  beforeEach(() => {
    const duration = new Duration();
    schedule = new Schedule(duration, START_TIME, END_TIME);
  });

  it('should have duration', () => {
   // given
   // when
   // then
   schedule.should.have.property('duration');
   schedule.duration.should.be.instanceof(Duration);
  });

  it('should have a start time', () => {
   // given
   // when
   // then
   schedule.should.have.property('startTime');
   schedule.startTime.should.be.instanceof(Date);
  });

  it('should have an end time', () => {
   // given
   // when
   // then
   schedule.should.have.property('endTime');
   schedule.endTime.should.be.instanceof(Date);
  });
});
