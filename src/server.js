import express from 'express'
import listEndpoints from "express-list-endpoints"
import cors from 'cors'
import { join } from 'path'
// Routers
import authorsRouter from './services/authors/index.js'
import blogPostsRouter from './services/blogPosts/index.js'

import { dataFolderPath } from './lib/fs-tools.js'
import { genericErrorHandler, notFoundErrorHandler, badRequestErrorHandler, unauthorizedErrorHandler } from "./errorHandlers.js"


const PORT = process.env.PORT || 5000

const server = express()

const publicFolderPath = join(process.cwd(), './public')
server.use(express.static(publicFolderPath))
server.use(cors())
server.use(express.json())



server.use('/authors', authorsRouter)
server.use('/blogPosts',  blogPostsRouter)


// --------------------------------- ERROR HANDLERS -----------------
server.use(badRequestErrorHandler) // 400
server.use(unauthorizedErrorHandler) // 401
server.use(notFoundErrorHandler) // 404
server.use(genericErrorHandler) // 500


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    console.table(listEndpoints(server))})