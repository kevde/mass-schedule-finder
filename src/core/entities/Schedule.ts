import Duration from './durations/Duration';

export default class Schedule {
  duration: Duration;
  startTime: Date;
  endTime: Date;

  constructor(duration, startTime, endTime) {
    this.duration = duration;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  static parse(rawSchedule) {
    const duration = new Date(rawSchedule.duration);
    const startTime = new Date(rawSchedule.startTime);
    const endTime = new Date(rawSchedule.endTime);
    return new Schedule(duration, startTime, endTime);
  }
}