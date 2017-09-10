import 'mocha';
import * as Q from 'q';
import * as sinon from 'sinon';
import * as moment from 'moment';
import NoSqlDatabase from '../../../src/infrastructure/database/NoSqlDatabase';
import ChurchRepository from '../../../src/infrastructure/repositories/ChurchRepository';
import Criteria from '../../../src/infrastructure/database/criterias/Criteria';
import Church from '../../../src/core/entities/Church';

describe('ChurchRepository', () => {
  let repository, database;
  let defaultCriteria, sanMateoChurch;

  beforeEach(() => {
    defaultCriteria = new Criteria('churches');
    sanMateoChurch = new Church('San Mateo', '', '');
    database = sinon.createStubInstance(NoSqlDatabase);
    repository = new ChurchRepository(database);
  });

  it('should get all churches', () => {
    // given
    database.query.withArgs(defaultCriteria).resolves([sanMateoChurch]);

    // when
    const resultPromise = repository.getChurches(defaultCriteria);

    // then
    return resultPromise.then((churches) => {
      database.query.should.be.calledWith(defaultCriteria);
      churches.should.all.be.instanceof(Church);
    });
  });

  it('should add a church', () => {
    // given
    const sanMateoChurch = new Church('San Mateo', '', '');
    database.save.resolves(sanMateoChurch);

    // when
    const resultPromise = repository.addChurch(defaultCriteria, sanMateoChurch);

    // then
    return resultPromise.then((savedChurch) => {
      database.save.called.should.be.true;
    });
  });
});