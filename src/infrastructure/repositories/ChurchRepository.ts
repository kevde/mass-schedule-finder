import * as _ from 'lodash';
import IDatabase from '../database/IDatabase';
import Criteria from '../database/criterias/Criteria';
import Church from '../../core/entities/Church';

export default class ChurchRepository {
  database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  getChurches(criteria: Criteria) {
    return this.database.query(criteria)
      .then((rawData) => _.map(rawData, (rawChurch) => new Church(rawChurch.name, rawChurch.place, rawChurch.description)));
  }
}