import { Module } from '@nestjs/common';
import ApplicationController from './ApplicationController';
import ChurchRepository from '../repositories/ChurchRepository';

@Module({
  controllers: [ApplicationController],
  components: [{ provide: ChurchRepository, useValue: new ChurchRepository() }]
})
export default class ApplicationModule {}