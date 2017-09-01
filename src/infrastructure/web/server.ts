import * as process from 'process';
import * as express from 'express';
import * as cors from 'cors';
import { NestFactory } from '@nestjs/core';
import ApplicationModule from './ApplicationModule';

const instance = express();
const PORT_NUMBER = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const SUCCESS_MESSAGE = `Application is listening on port ${PORT_NUMBER} (running on ${process.env.NODE_ENV} environment)`;

instance.use(cors());
const app = NestFactory.create(ApplicationModule, instance);
app.listen(PORT_NUMBER, () => console.log(SUCCESS_MESSAGE));