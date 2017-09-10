import { Controller, Get, HttpStatus, Post } from '@nestjs/common';
import ChurchRepository from "../repositories/ChurchRepository";
import Criteria from '../database/criterias/Criteria';
import CriteriaFactory from '../database/criterias/CriteriaFactory';
import Point from '../../core/entities/Point';
import Schedule from '../../core/entities/Schedule';
import ChurchLocator from '../../core/services/ChurchLocator';

@Controller('api')
export default class ApplicationController {
  constructor(
    private churchRepository: ChurchRepository,
    private criteriaFactory: CriteriaFactory,
    private churchLocator: ChurchLocator
  ) {}

  @Get('search')
  async main(request, response, next) {
    const { point, range } = this.criteriaFactory.createQueryObject(request.query);
    const churchCriteria = this.criteriaFactory.createChurchCriteria(request.query);
    const allChurches = await this.churchRepository.getChurches(churchCriteria);
    const churches = await this.churchLocator.getNearbyChurches(point, allChurches, range);
    response.status(HttpStatus.OK).json(churches);
  }

  @Get('search/upcoming')
  async upcoming(request, response, next) {
    const { point, range, startTime } = this.criteriaFactory.createQueryObject(request.query);
    const churchCriteria = this.criteriaFactory.createChurchCriteria(request.query);
    const allChurches = await this.churchRepository.getChurches(churchCriteria);
    const churches = await this.churchLocator.getNearbyChurchesWithSchedule(point, allChurches, range, startTime);
    response.status(HttpStatus.OK).json(churches);
  }
}