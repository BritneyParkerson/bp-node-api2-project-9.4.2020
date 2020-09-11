const server = require('./server.js');


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\n*** Port 3000 ready to run ***\n`);
});
