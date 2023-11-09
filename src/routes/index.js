const homeRouter = require('./home')
const bookingRouter = require('./booking')

function route(app) {
    app.use('/api/booking', bookingRouter)
    app.use('/api', homeRouter)
}

module.exports = route;