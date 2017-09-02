import { Module } from '@nestjs/common';
import ApplicationController from './ApplicationController';
import ChurchRepository from '../repositories/ChurchRepository';
import NoSqlDatabase from '../database/NoSqlDatabase';


const database = new NoSqlDatabase();
const churchRepository = new ChurchRepository(database);

@Module({
  controllers: [ApplicationController],
  components: [{ provide: ChurchRepository, useValue: churchRepository }]
})
export default class ApplicationModule {}