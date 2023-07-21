const app = require('./app');
const connectDB = require('./config/db');
const logger = require('./controllers/loggerController');
const { port } = require('./secret');

app.listen(port, async () => {
  logger.log('info', `Server is running at http://localhost:${port}`);
  await connectDB();
});
