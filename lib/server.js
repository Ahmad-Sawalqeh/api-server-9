'use strict';


// 3rd party depndencies
const express = require('express')
const morgan = require('morgan')


// custom middleware
const notFoundHandler = require('../middleware/404.js')
const errorHandler = require('../middleware/500.js')

// custom routes
const apiRouter = require('../routes/v1.js')

// app constant
const app = express();

app.use(express.json())
app.use(morgan('dev'))
app.use(apiRouter)
app.use(notFoundHandler)
app.use('*', errorHandler)

module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.PORT || 7777;
        app.listen(PORT, () => console.log(`welcome aboard on ${PORT}`))
    }
}