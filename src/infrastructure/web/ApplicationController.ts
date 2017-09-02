import { Controller, Get, HttpStatus, Post } from '@nestjs/common';
import ChurchRepository from "../repositories/ChurchRepository";
import Criteria from '../database/criterias/Criteria';

@Controller('api')
export default class ApplicationController {
  constructor(private churchRepository: ChurchRepository) {}

  @Get('search')
  async main(request, response, next) {
    const defaultCriteria = new Criteria('churches');
    const churches = await this.churchRepository.getChurches(defaultCriteria);
    response.status(HttpStatus.OK).json(churches);
  }
}