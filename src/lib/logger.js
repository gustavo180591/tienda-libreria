import pino from 'pino';

// Create a Pino logger instance
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:dd-mm-yy HH:MM:ss',
      ignore: 'pid,hostname',
    },
  },
});

export { logger };
