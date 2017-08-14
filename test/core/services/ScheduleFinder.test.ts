import 'mocha';
import ScheduleFinder from '../../../src/core/services/ScheduleFinder';
import Schedule from '../../../src/core/entities/Schedule';
import Duration from '../../../src/core/entities/durations/Duration';

describe('ScheduleFinder', () => {
  let scheduleFinder, schedules, nineMorningSchedule, tenMorningSchedule, elevenMorningSchedule;
  before(() => {
    const duration = new Duration();
    nineMorningSchedule = new Schedule(duration, new Date('1 Jan 1900 09:00:00'), new Date('1 Jan 1900 10:00:00'));
    tenMorningSchedule = new Schedule(duration, new Date('1 Jan 1900 10:00:00'), new Date('1 Jan 1900 11:00:00'));
    elevenMorningSchedule = new Schedule(duration, new Date('1 Jan 1900 11:00:00'), new Date('1 Jan 1900 12:00:00'));
    schedules = [elevenMorningSchedule, tenMorningSchedule, nineMorningSchedule];
  });

  beforeEach(() => {
    scheduleFinder = new ScheduleFinder();
  });

  it('should get next schedule when time is at eight in morning', () => {
    // given
    const currentDate = new Date('1 Jan 1900 08:00:00');

    // when
    const nearestSchedule = scheduleFinder.getNextSchedule(schedules, currentDate);

    // then
    nearestSchedule.should.be.deep.equals(nineMorningSchedule);
  });

  it('should get next schedule when time is at nine thirty in morning', () => {
    // given
    const currentDate = new Date('1 Jan 1900 09:30:00');

    // when
    const nearestSchedule = scheduleFinder.getNextSchedule(schedules, currentDate);

    // then
    nearestSchedule.should.be.deep.equals(tenMorningSchedule);
  });

  it('should get all upcoming schedule when time is at nine thirty in morning', () => {
    // given
    const currentDate = new Date('1 Jan 1900 09:30:00');

    // when
    const nearestSchedule = scheduleFinder.getUpcomingSchedules(schedules, currentDate);

    // then
    nearestSchedule.should.be.deep.equals([tenMorningSchedule, elevenMorningSchedule]);
  });
});