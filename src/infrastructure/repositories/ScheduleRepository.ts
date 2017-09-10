import * as _ from 'lodash';
import IDatabase from '../database/IDatabase';
import Criteria from '../database/criterias/Criteria';
import Schedule from '../../core/entities/Schedule';

export default class ScheduleRepository {
 database: IDatabase;

 constructor(database: IDatabase) {
  this.database = database;
 }

 getSchedules(criteria: Criteria) {
  return this.database.query(criteria)
   .then((rawData) => _.map(rawData, (rawSchedule) => Schedule.parse(rawSchedule)));
 }

 addSchedule(criteria: Criteria, church: Schedule) {
  return this.database.save(criteria, church);
 }
}