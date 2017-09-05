import Point from '../../../core/entities/Point';

export default class QueryObject {
 point: Point;
 startTime: Date;
 range: Number;

 constructor(point, startTime, range) {
  this.point = point;
  this.startTime = startTime;
  this.range = range;
 }
}