import 'mocha';
import * as Q from 'q';
import * as sinon from 'sinon';
import * as moment from 'moment';
import NoSqlDatabase from '../../../src/infrastructure/database/NoSqlDatabase';
import ScheduleRepository from '../../../src/infrastructure/repositories/ScheduleRepository';
import Criteria from '../../../src/infrastructure/database/criterias/Criteria';
import Schedule from '../../../src/core/entities/Schedule';

describe('ScheduleRepository', () => {
  let repository, database;
  let defaultCriteria, sanMateoSchedule;

  beforeEach(() => {
    defaultCriteria = new Criteria('schedules');
    sanMateoSchedule = new Schedule('San Mateo', '', '');
    database = sinon.createStubInstance(NoSqlDatabase);
    repository = new ScheduleRepository(database);
  });

  it('should get all churches', () => {
    // given
    database.query.withArgs(defaultCriteria).resolves([sanMateoSchedule]);

    // when
    const resultPromise = repository.getSchedules(defaultCriteria);

    // then
    return resultPromise.then((churches) => {
      database.query.should.be.calledWith(defaultCriteria);
      churches.should.all.be.instanceof(Schedule);
    });
  });

  it('should add a church', () => {
    // given
    const sanMateoSchedule = new Schedule('San Mateo', '', '');
    database.save.resolves(sanMateoSchedule);

    // when
    const resultPromise = repository.addSchedule(defaultCriteria, sanMateoSchedule);

    // then
    return resultPromise.then((savedSchedule) => {
      database.save.called.should.be.true;
    });
  });
});