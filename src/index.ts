import { createServer } from 'http';
import { app } from './app.js';
import createDebug from 'debug';

const debugServer = createDebug('LOG:INDEX');
const PORT = process.env.PORT || 3000;
const server = createServer(app);

server.on('listening', () => {
  debugServer('Listening on port', PORT);
});
