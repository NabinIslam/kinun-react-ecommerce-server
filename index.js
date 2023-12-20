const app = require('./src/app');
const connectDB = require('./src/config/db');
require('dotenv').config();

const port = process.env.PORT;

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
  await connectDB();
});
