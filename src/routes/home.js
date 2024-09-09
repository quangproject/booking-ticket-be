const express = require("express")
const router = express.Router()
const homeController = require('../app/controllers/HomeController')
const AuthMiddleware = require("../app/middlewares/AuthMiddleware")

router.get('/home', AuthMiddleware.basicAuth, homeController.index)

module.exports = router