import http from 'http';
// app imported from app.js for server configuration
import app from '../app.js';
// PORT constant assigned value
const PORT = process.env.PORT || '5000';
// port set PORT constant
app.set('port', PORT);
// server created
const server = http.createServer(app);
// server port set
server.listen(PORT);
// server listening function declared used for communicating server  port
const listening = () => {
  const addr = server.address();
  console.log(`Listening on port: ${addr.port}`);
};
// server set to listen event on listening result
server.on('listening', listening);
