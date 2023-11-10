const express = require("express")
const router = express.Router()
const bookingController = require('../app/controllers/BookingController')

router.post('/', bookingController.create)
router.get('/search', bookingController.searchByEmail)
router.get('/truncate', bookingController.truncate)

module.exports = router