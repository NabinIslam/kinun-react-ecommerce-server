const app = require('./src/app');
const connectDB = require('./src/config/db');
const logger = require('./src/controllers/loggerController');
const { port } = require('./src/secret');

app.listen(port, async () => {
  logger.log('info', `Server is running at http://localhost:${port}`);
  await connectDB();
});