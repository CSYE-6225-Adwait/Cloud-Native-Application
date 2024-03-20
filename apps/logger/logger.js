import winston from 'winston';
import fs from 'fs';
import path from 'path';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: '/var/log/webapp.log' })
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSS[Z]' }),
    winston.format.json(),
    winston.format.printf(({ level, message, timestamp }) => {
        return `{"name":"webapp","severity":"${level.toUpperCase()}","message":"${message}","timestamp":"${timestamp}"}`;
      })
  )
});

export default logger;