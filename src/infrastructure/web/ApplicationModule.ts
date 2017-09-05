import { Module } from '@nestjs/common';
import ApplicationController from './ApplicationController';
import ChurchRepository from '../repositories/ChurchRepository';
import NoSqlDatabase from '../database/NoSqlDatabase';
import CriteriaFactory from "../database/criterias/CriteriaFactory";


const database = new NoSqlDatabase();
const churchRepository = new ChurchRepository(database);
const criteriaFactory = new CriteriaFactory();

@Module({
  controllers: [ApplicationController],
  components: [{ provide: ChurchRepository, useValue: churchRepository }, {provide: CriteriaFactory, useValue: criteriaFactory }]
})
export default class ApplicationModule {}