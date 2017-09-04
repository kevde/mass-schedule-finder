import { Controller, Get, HttpStatus, Post } from '@nestjs/common';
import ChurchRepository from "../repositories/ChurchRepository";
import Criteria from '../database/criterias/Criteria';
import CriteriaFactory from '../database/criterias/CriteriaFactory';

@Controller('api')
export default class ApplicationController {
  constructor(private churchRepository: ChurchRepository, private criteriaFactory: CriteriaFactory) {}

  @Get('search')
  async main(request, response, next) {
    const churches = await this.churchRepository.getChurches(this.criteriaFactory.createBasic('churches'));
    response.status(HttpStatus.OK).json(churches);
  }
}