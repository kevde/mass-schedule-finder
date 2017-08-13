import 'mocha';
import Church from '../../../src/core/entities/Church';
import Schedule from '../../../src/core/entities/Schedule';
import Point from '../../../src/core/entities/Point';
import Duration from '../../../src/core/entities/durations/Duration';

describe('Church', () => {

  let church;
  const CHURCH_NAME = 'Our Lady of Pentecost Parish';
  const CHURCH_ADDRESS = 'Quezon City';
  const CHURCH_X_AXIS = 100;
  const CHURCH_Y_AXIS = 100;

  beforeEach(() => {
    const point = new Point(CHURCH_X_AXIS, CHURCH_Y_AXIS);
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
   const duration = new Duration();
   const schedule = new Schedule(duration, new Date(), new Date());

   // when
   church.addSchedule(schedule);
   
   // then
   church.schedule.should.contain(schedule);
  });
});
