const express = require('express');
const path = require('path');

const server = express();

server.use(express.static(path.join(__dirname, './src'), {
  setHeaders: function (res, path) {
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript')
    }
  }
}));

server.get('/', (_req, res) => {
  res.status(200).sendFile(path.join(__dirname+'/dist/index.html'));
});

server.get('*', (_req, res) => {
  res.status(404).sendFile(path.join(__dirname+'/dist/404.html'));
});

const port = 8081;
const host = 'localhost';

server.listen(port, host, err => {
  if (err) {
    throw err;
  }
  console.log(`> Ready on http://${host}:${port}`);
});
