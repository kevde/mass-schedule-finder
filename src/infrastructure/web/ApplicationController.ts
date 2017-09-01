import { Controller, Get, HttpStatus, Post } from '@nestjs/common';
import ChurchRepository from "../repositories/ChurchRepository";

@Controller('api')
export default class ApplicationController {
  constructor(private churchRepository :ChurchRepository){}
  @Get('search')
  main(request, response, next) {
    console.log(this);
    console.log(request);
    response.status(HttpStatus.OK).json(request);
  }
}
