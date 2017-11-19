// import & create & setting config of this middleware

const loggerMiddleware = () => {
  // // dynamic import logger middleware for print action in console
  const { createLogger } = require('redux-logger');
  // create logger middleware
  const logger = createLogger({
    duration: true,
    timestamp: true,
  });

  return logger;
};

export default loggerMiddleware;