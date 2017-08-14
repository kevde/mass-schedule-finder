import * as _ from 'lodash';

export default class ScheduleFinder {
  getNextSchedule(schedules, currentDate) {
    return _.head(this.getUpcomingSchedules(schedules, currentDate));
  }

  getUpcomingSchedules(schedules, currentDate) {
    return _.chain(schedules)
      .filter((schedule) => schedule.startTime >= currentDate)
      .sortBy('startTime').value();
  }
}