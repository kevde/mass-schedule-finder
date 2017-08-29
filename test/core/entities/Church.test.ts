import 'mocha';
import Church from '../../../src/core/entities/Church';
import Schedule from '../../../src/core/entities/Schedule';
import Point from '../../../src/core/entities/Point';
import Duration from '../../../src/core/entities/durations/Duration';

describe('Church', () => {

  let church, duration;
  const CHURCH_NAME = 'Our Lady of Pentecost Parish';
  const CHURCH_ADDRESS = 'Quezon City';
  const CHURCH_X_AXIS = 100;
  const CHURCH_Y_AXIS = 100;
  const EIGHT_MORNING = new Date('1 Jan 1900 08:00:00');
  const NINE_MORNING = new Date('1 Jan 1900 09:00:00');
  const TEN_MORNING = new Date('1 Jan 1900 10:00:00');

  beforeEach(() => {
    const point = new Point(CHURCH_X_AXIS, CHURCH_Y_AXIS);
    duration = new Duration();
    church = new Church(CHURCH_NAME, CHURCH_ADDRESS, point);
  });

  it('should have name', () => {
    // given

    // when

    // then
    church.should.have.property('name');
    church.name.should.be.equals(CHURCH_NAME);
  });

  it('should have an address', () => {
    // given

    // when

    // then
    church.should.have.property('address');
    church.address.should.be.equals(CHURCH_ADDRESS);
  });

  it('should have a geometric point', () => {
    // given
    // when
    // then
    church.should.have.property('location');
    church.location.should.be.instanceof(Point);
    church.location.x.should.be.equals(CHURCH_X_AXIS);
    church.location.y.should.be.equals(CHURCH_Y_AXIS);
  });

  it('should have an array of mass schedules', () => {
    // given
    // when
    // then
    church.should.have.property('schedule');
    church.schedule.should.be.instanceof(Array);
    church.schedule.should.all.be.instanceof(Schedule);
  });

  it('should add a schedule', () => {
    // given
    const schedule = new Schedule(duration, new Date(), new Date());

    // when
    church.addSchedule(schedule);

    // then
    church.schedule.should.contain(schedule);
  });

  it('should update arrival time', () => {
    // given
    const arrivalTime = new Date('1 Jan 1900 09:00:00');

    // when
    const churchWithTime = church.withArrivalTime(arrivalTime);

    // then
    churchWithTime.arrivalTime.should.be.deep.equals(arrivalTime);
  });

  it('should check if a schedule exists', () => {
    // given
    const eightMorningSchedule = new Schedule(duration, EIGHT_MORNING, NINE_MORNING);
    const nineMorningSchedule = new Schedule(duration, NINE_MORNING, TEN_MORNING);
    church.addSchedule(eightMorningSchedule);
    church.addSchedule(nineMorningSchedule);

    // when
    const hasSchedule = church.hasSchedule(NINE_MORNING);
    const hasNoSchedule = church.hasSchedule(TEN_MORNING);

    // then
    hasSchedule.should.be.equals(true);
    hasNoSchedule.should.be.equals(false);
  });
});