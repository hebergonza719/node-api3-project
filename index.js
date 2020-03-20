// code away!
require('dotenv').config();

const port = process.env.PORT || 5000;

const server = require('./server.js');

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});