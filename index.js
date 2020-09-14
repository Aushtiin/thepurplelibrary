require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const logger = require("./util/logger");
const GracefulShutdownManager = require('@moebius/http-graceful-shutdown').GracefulShutdownManager;
require('./util/db')();

require('./routes/routes')(app)


const server = app.listen(port, () =>
  logger.info(
    `Server is running on ${process.env.NODE_ENV}, and listening on port ${port}`
  )
);

const shutdownManager = new GracefulShutdownManager(server);

process.on('SIGTERM', () => {
    shutdownManager.terminate(() => {
      console.log('Server is gracefully terminated');
    });
  });
