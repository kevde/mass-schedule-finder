import 'mocha';
import ChurchLocator from '../../../src/core/services/ChurchLocator';
import Church from '../../../src/core/entities/Church';
import Point from '../../../src/core/entities/Point';
import Schedule from '../../../src/core/entities/Schedule';
import Duration from '../../../src/core/entities/durations/Duration';
import ScheduleFinder from '../../../src/core/services/ScheduleFinder';

describe('ChurchLocator', () => {
  let churchLocator;
  const ADDRESS = 'Manila';
  const NEAR_CHURCH_NAME = 'Manila Church';
  const FAR_CHURCH_NAME = 'Malate Church';
  let churches, teacherVillageChurch, upDilimanChurch, commonWealthChurch, meycauwayanChurch;
  let eightMorningSchedule, nineMorningSchedule, tenMorningSchedule, elevenMorningSchedule;
  const CURRENT_POINT = new Point(10, 10);
  const eightMorning = new Date('1 Jan 1900 08:00:00');
  const nineMorning = new Date('1 Jan 1900 09:00:00');
  const tenMorning = new Date('1 Jan 1900 10:00:00');
  const elevenMorning = new Date('1 Jan 1900 11:00:00');
  const twelveNoon = new Date('1 Jan 1900 12:00:00');
  const scheduleFinder = new ScheduleFinder();

  before(() => {
    teacherVillageChurch = new Church('Teacher Village Church', 'Mayumi St. Diliman', new Point(10.01, 10.01));
    upDilimanChurch = new Church('Diliman Church', 'UP Diliman', new Point(10.02, 10.02));
    commonWealthChurch = new Church('Commonwealth Church', 'Commonwealth', new Point(10.03, 10.03));
    meycauwayanChurch = new Church('Meycauwayan Church', 'Bulacan', new Point(12.04, 12.04));
    churches = [meycauwayanChurch, commonWealthChurch, teacherVillageChurch, upDilimanChurch];

    const duration = new Duration();
    eightMorningSchedule = new Schedule(duration, eightMorning, nineMorning);
    nineMorningSchedule = new Schedule(duration, nineMorning, tenMorning);
    tenMorningSchedule = new Schedule(duration, tenMorning, elevenMorning);
    elevenMorningSchedule = new Schedule(duration, elevenMorning, twelveNoon);

    teacherVillageChurch.addSchedule(nineMorningSchedule);

    upDilimanChurch.addSchedule(nineMorningSchedule);
    upDilimanChurch.addSchedule(tenMorningSchedule);

    commonWealthChurch.addSchedule(tenMorningSchedule);
    commonWealthChurch.addSchedule(elevenMorningSchedule);

    teacherVillageChurch.withArrivalTime(new Date('1 Jan 1900 08:59:59'));
    upDilimanChurch.withArrivalTime(new Date('1 Jan 1900 07:59:59'));
    commonWealthChurch.withArrivalTime(new Date('1 Jan 1900 08:00:01'));
    meycauwayanChurch.withArrivalTime(new Date('1 Jan 1900 07:00:00'));
  });

  beforeEach(() => {
    churchLocator = new ChurchLocator(scheduleFinder);
  });

  it('should find nearest Church', () => {
    // given
    const nearestPoint = new Point(10.01, 10.01);
    const farthestPoint = new Point(10.02, 100.02)
    const nearestChurch = new Church(NEAR_CHURCH_NAME, ADDRESS, nearestPoint);
    const farthestChurch = new Church(FAR_CHURCH_NAME, ADDRESS, farthestPoint);
    const churches = [farthestChurch, nearestChurch];

    // when
    const church = churchLocator.getNearest(CURRENT_POINT, churches, 50000);

    // then
    church.should.be.deep.equals(nearestChurch);
  });

  it('should get all nearby churches and sorted by proximity', () => {
    // given

    // when
    const nearbyChurches = churchLocator.getNearbyChurches(CURRENT_POINT, churches, 5000);

    // then
    nearbyChurches.should.be.deep.equals([teacherVillageChurch, upDilimanChurch, commonWealthChurch]);
  });

  it('should get all nearby churches on with a given schedule', () => {
    // given

    // when
    const churchesAtTenMorning = churchLocator.getNearbyChurchesWithSchedule(CURRENT_POINT, churches, 5000, tenMorning);
    const churchesAtNineMorning = churchLocator.getNearbyChurchesWithSchedule(CURRENT_POINT, churches, 5000, nineMorning);
    const churchesAtElevenMorning = churchLocator.getNearbyChurchesWithSchedule(CURRENT_POINT, churches, 5000, elevenMorning);

    // then
    churchesAtNineMorning.should.be.deep.equals([teacherVillageChurch, upDilimanChurch, commonWealthChurch]);
    churchesAtTenMorning.should.be.deep.equals([upDilimanChurch, commonWealthChurch]);
    churchesAtElevenMorning.should.be.deep.equals([commonWealthChurch]);
  });

  it('sort all churches by arrival time', () => {
    // given

    // when
    const churchesByArrivalTime = churchLocator.sortByArrivalTime(churches);

    // then
    churchesByArrivalTime.should.be.deep.equals([meycauwayanChurch, upDilimanChurch, commonWealthChurch, teacherVillageChurch]);
  });

  it('sort nearest church by arrival time', () => {
    // given

    // when
    const churchesByArrivalTime = churchLocator.getNearestByArrivalTime(churches);

    // then
    churchesByArrivalTime.should.be.deep.equals(meycauwayanChurch);
  });

  it('should get all nearby churches can be catchup in a given schedule', () => {
    // given
    teacherVillageChurch.addSchedule(eightMorningSchedule);
    upDilimanChurch.addSchedule(eightMorningSchedule);
    commonWealthChurch.addSchedule(eightMorningSchedule);
    meycauwayanChurch.addSchedule(eightMorningSchedule);

    // when
    const churchesAtEightMorning = churchLocator.getArrivableChurches(churches, eightMorning);
    const churchesAtNineMorning = churchLocator.getArrivableChurches(churches, nineMorning);

    // then
    churchesAtEightMorning.should.be.deep.equals([meycauwayanChurch, upDilimanChurch]);
    churchesAtNineMorning.should.be.deep.equals([upDilimanChurch, teacherVillageChurch]);
  });
});