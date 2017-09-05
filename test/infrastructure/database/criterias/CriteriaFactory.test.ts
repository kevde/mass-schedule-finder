import 'mocha';
import { should } from 'chai';
import * as Q from 'q';
import * as sinon from 'sinon';
import * as moment from 'moment';
import Point from '../../../../src/core/entities/Point';
import Criteria from '../../../../src/infrastructure/database/criterias/Criteria';
import QueryObject from '../../../../src/infrastructure/database/criterias/QueryObject';
import CriteriaFactory from '../../../../src/infrastructure/database/criterias/CriteriaFactory';

describe('CriteriaFactory', () => {
  let criteriaFactory;
  should();

  beforeEach(() => {
    criteriaFactory = new CriteriaFactory();
  });

  xit('should create criteria', () => {
    // given

    // when
    const result = criteriaFactory.createChurchCriteria('churches');

    // then
    result.should.be.instanceof(Criteria);
  });

  it('should create query object', () => {
    // given
    const rawQueryObject = { lat: '10.1', long: '11.1', r: '5000', start: '1439329773' };

    // when
    const result: any = criteriaFactory.createQueryObject(rawQueryObject);

    // then
    result.startTime.should.be.deep.equals(moment.unix(parseInt(rawQueryObject.start)).toDate());
    result.point.should.be.deep.equals(new Point(parseFloat(rawQueryObject.long), parseFloat(rawQueryObject.lat)));
    result.range.should.be.deep.equals(parseFloat(rawQueryObject.r));
  });

});