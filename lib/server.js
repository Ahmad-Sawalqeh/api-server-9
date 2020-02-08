

// 3rd party depndencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();


// custom middleware
const notFoundHandler = require('../middleware/404.js');
const errorHandler = require('../middleware/500.js');

// custom routes
const apiRouter = require('../routes/v1.js');

// app constant
const app = express();

// 3rd party middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// 1st party middleware
// app.use(apiRouter);
app.use('/api/v1', apiRouter);

app.use('*', notFoundHandler);
app.use(errorHandler);

// app.use(notFoundHandler);
// app.use('*', errorHandler);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`server up ${PORT}`));
  },
};
