import 'mocha';
import * as Q from 'q';
import * as sinon from 'sinon';
import * as moment from 'moment';
import * as httpMocks from 'node-mocks-http';
import CriteriaFactory from '../../../src/infrastructure/database/criterias/CriteriaFactory';
import ChurchRepository from '../../../src/infrastructure/repositories/ChurchRepository';
import ChurchLocator from '../../../src/core/services/ChurchLocator';
import ApplicationController from '../../../src/infrastructure/web/ApplicationController';
import Criteria from '../../../src/infrastructure/database/criterias/Criteria';
import Church from '../../../src/core/entities/Church';
import QueryObject from "../../../src/infrastructure/database/criterias/QueryObject";

describe('ApplicationController', () => {
  let churchRepository, criteriaFactory, churchLocator, controller;

  beforeEach(() => {
    criteriaFactory = sinon.createStubInstance(CriteriaFactory);
    churchRepository = sinon.createStubInstance(ChurchRepository);
    churchLocator = sinon.createStubInstance(ChurchLocator);
    controller = new ApplicationController(churchRepository, criteriaFactory, churchLocator);
  });

  it('should perform generic search', () => {
    // given
    const request = httpMocks.createRequest();
    const response = httpMocks.createResponse();
    const mockCriteria = new Criteria('churches');
    const churches = [sinon.createStubInstance(Church)];
    const rawQuery = sinon.createStubInstance(QueryObject);
    criteriaFactory.createQueryObject.withArgs(rawQuery).returns(rawQuery);
    criteriaFactory.createChurchCriteria.withArgs(rawQuery).returns(mockCriteria);
    churchRepository.getChurches.withArgs(mockCriteria).resolves(churches);

    // when
    const resultPromise = controller.main(request, response);

    // then
    return resultPromise.then(() => {
      criteriaFactory.createChurchCriteria.should.be.calledWith(rawQuery);
      churchRepository.getChurches.should.be.calledWith(mockCriteria);
      churchLocator.getNearbyChurches.should.be.calledWithExactly(rawQuery.point, churches, rawQuery.range);
      response._getData().should.all.be.instanceof(Church);
    });
  });

  it('should search churches with upcoming schedules', () => {
    // given
    const request = httpMocks.createRequest();
    const response = httpMocks.createResponse();
    const mockCriteria = new Criteria('churches');
    const churches = [sinon.createStubInstance(Church)];
    const rawQuery = sinon.createStubInstance(QueryObject);
    criteriaFactory.createQueryObject.withArgs(rawQuery).returns(rawQuery);
    criteriaFactory.createChurchCriteria.withArgs(rawQuery).returns(mockCriteria);
    churchRepository.getChurches.withArgs(mockCriteria).resolves(churches);

    // when
    const resultPromise = controller.upcoming(request, response);

    // then
    return resultPromise.then(() => {
      criteriaFactory.createChurchCriteria.should.be.calledWith(rawQuery);
      churchRepository.getChurches.should.be.calledWith(mockCriteria);
      churchLocator.getNearbyChurchesWithSchedule.should.be.calledWithExactly(rawQuery.point, churches, rawQuery.range, rawQuery.startTime);
      response._getData().should.all.be.instanceof(Church);
    });
  });
});