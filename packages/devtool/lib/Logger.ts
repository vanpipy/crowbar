import {resolve} from 'path';
import winston from 'winston';
import {ERROR_LOG_FILENAME, INFO_LOG_FILENAME} from './constant';

const context = process.cwd();
const errorLogFile = resolve(context, ERROR_LOG_FILENAME);
const infoLogFile = resolve(context, INFO_LOG_FILENAME);

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: errorLogFile, level: 'error' }),
    new winston.transports.File({ filename: infoLogFile }),
  ]
});

export default logger;
