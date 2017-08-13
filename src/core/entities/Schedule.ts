import Duration from './durations/Duration';

export default class Schedule {
duration: Duration;
startTime: Date;
endTime:Date;

 constructor(duration, startTime, endTime) {
  this.duration = duration;
  this.startTime = startTime;
  this.endTime = endTime;
 }
}