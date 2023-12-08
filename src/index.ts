import { createServer } from 'http';
import { app } from './app.js';
import createDebug from 'debug';
import { dbConnect } from './services/db.connect.js';

const debugServer = createDebug('LOG:INDEX');
const PORT = 3030; // Process.env.PORT || 3030;
const server = createServer(app);

dbConnect()
  .then((mongoose) => {
    server.listen(PORT);
    debugServer(`Connect to DB: ${mongoose.connection.db.databaseName}`);
  })
  .catch((error) => server.emit(error));

server.on('listening', () => {
  debugServer('Listening on port', PORT);
});

server.on('error', (error) => {
  console.log(`Error ${error.message}`);
});
