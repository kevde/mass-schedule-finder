import * as moment from 'moment';
import Criteria from './Criteria';
import QueryObject from "./QueryObject";
import Point from "../../../core/entities/Point";

export default class CriteriaFactory {

  createChurchCriteria(rawQuery: any) {
    return new Criteria('churches');
  }

  createQueryObject(rawQuery: any): QueryObject {
    const startTime = moment.unix(parseInt(rawQuery.start)).toDate();
    const point = new Point(parseFloat(rawQuery.long), parseFloat(rawQuery.lat));
    const range = parseFloat(rawQuery.r);
    return new QueryObject(point, startTime, range);
  }
}