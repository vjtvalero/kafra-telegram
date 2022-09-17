const dotenv = require('dotenv');
dotenv.config();
const telegram = require('./bot');
telegram.start();
// telegram ends here

const http = require('http');
const url = require('url');
const { getAndSendPendingReminders } = require('./jobs/sender');

const port = process.env.PORT;

const server = http.createServer((req, res) => {
  const requestUrl = url.parse(req.url);
  const path = requestUrl.pathname;

  const parts = path.split('/').slice(1);

  if (parts[0] === 'remind') { // manually call in server (cron) if webhook is set
    console.log('/remind accessed');
    getAndSendPendingReminders();
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(parts[1]);
});

server.listen(port, () => {
  console.log(`Server running`);
});
