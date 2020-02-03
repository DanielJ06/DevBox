const { Router } = require('express')
const routes = Router()

const multer = require('multer')
const multerConfig = require('./config/multer')

const BoxController = require('./controllers/BoxController')
const FileController = require('./controllers/FileController')

routes.get('/boxes', BoxController.show)
routes.post('/boxes', BoxController.store)

routes.get('/boxes/:id', BoxController.index)

routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store)

module.exports = routes