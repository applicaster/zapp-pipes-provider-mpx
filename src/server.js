const express = require('express');
const { restHandler } = require('./provider/handler');

const app = express();
const port = 8080;

restHandler(app);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
});
