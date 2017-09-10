import { Module } from '@nestjs/common';
import ApplicationController from './ApplicationController';
import ChurchRepository from '../repositories/ChurchRepository';
import NoSqlDatabase from '../database/NoSqlDatabase';
import ChurchLocator from '../../core/services/ChurchLocator';
import ScheduleFinder from '../../core/services/ScheduleFinder';
import CriteriaFactory from "../database/criterias/CriteriaFactory";

const database = new NoSqlDatabase();
const scheduleFinder = new ScheduleFinder();
const criteriaFactory = new CriteriaFactory();
const churchRepository = new ChurchRepository(database);
const churchLocator = new ChurchLocator(scheduleFinder);

@Module({
  controllers: [ApplicationController],
  components: [
    { provide: ChurchRepository, useValue: churchRepository },
    { provide: CriteriaFactory, useValue: criteriaFactory },
    { provide: ChurchLocator, useValue: churchLocator }
  ]
})
export default class ApplicationModule {}