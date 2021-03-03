const path = require('path');
const express = require('express');
const compression = require('compression');

// If no PORT is given from docker compose we use local port from .env file.
if (!process.env.PORT) {
  require('dotenv').config();
}

const app = express();
const HTML_FILE = path.join(__dirname, 'index.html');
const PORT = process.env.PORT;

if (!PORT) {
  console.log('PORT is undefined, exiting...');
  process.exit(1);
}

app.use(compression());
app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
});

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
});
