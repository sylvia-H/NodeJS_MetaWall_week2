const headers = require('./headers');

function successHandler(res, posts) {
  res.writeHead(200, headers);
  res.write(JSON.stringify({
    "status": "success",
    "data": posts,
  }));
  res.end();
}

module.exports = successHandler;
