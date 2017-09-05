import 'mocha';
import * as Q from 'q';
import * as sinon from 'sinon';
import * as moment from 'moment';
import * as httpMocks from 'node-mocks-http';
import CriteriaFactory from '../../../src/infrastructure/database/criterias/CriteriaFactory';
import ChurchRepository from '../../../src/infrastructure/repositories/ChurchRepository';
import ApplicationController from '../../../src/infrastructure/web/ApplicationController';
import Criteria from '../../../src/infrastructure/database/criterias/Criteria';
import Church from '../../../src/core/entities/Church';

describe('ApplicationController', () => {
  let churchRepository, criteriaFactory, controller;

  beforeEach(() => {
    criteriaFactory = sinon.createStubInstance(CriteriaFactory);
    churchRepository = sinon.createStubInstance(ChurchRepository);
    controller = new ApplicationController(churchRepository, criteriaFactory);
  });

  it('should perform generic search', () => {
    // given
    const request = httpMocks.createRequest();
    const response = httpMocks.createResponse();
    const mockCriteria = new Criteria('churches');
    const rawQuery = {};
    criteriaFactory.createChurchCriteria.withArgs(rawQuery).returns(mockCriteria);

    // when
    const resultPromise = controller.main(request, response);

    // then
    return resultPromise.then((churches) => {
      criteriaFactory.createChurchCriteria.should.be.calledWith(rawQuery);
      churchRepository.getChurches.should.be.calledWith(mockCriteria);
    });
  });
});