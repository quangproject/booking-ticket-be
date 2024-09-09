const express = require("express")
const router = express.Router()
const bookingController = require('../app/controllers/BookingController')
const AuthMiddleware = require("../app/middlewares/AuthMiddleware")

router.get('/', AuthMiddleware.basicAuth, bookingController.index)
router.post('/', AuthMiddleware.basicAuth, bookingController.create)
router.get('/search', AuthMiddleware.basicAuth, bookingController.searchByEmail)
router.delete('/:id', AuthMiddleware.basicAuth, bookingController.deleteBooking)
router.delete('/truncate', AuthMiddleware.basicAuth, bookingController.truncate)

module.exports = router