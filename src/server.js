import express from 'express'
import authorsRouter from './services/authors/index.js'
import blogPostsRouter from './services/blogPosts/index.js'
import listEndpoints from "express-list-endpoints"
import { dataFolderPath } from './lib/fs-tools.js'
import { genericErrorHandler, notFoundErrorHandler, badRequestErrorHandler, unauthorizedErrorHandler } from "./errorHandlers.js"


const server = express()



server.use(express.json())



server.use('/authors', authorsRouter)
server.use('/blogPosts',  blogPostsRouter)

// --------------------------------- ERROR HANDLERS -----------------
server.use(badRequestErrorHandler) // 400
server.use(unauthorizedErrorHandler) // 401
server.use(notFoundErrorHandler) // 404
server.use(genericErrorHandler) // 500


server.listen(3000, () => {
    console.log('Server is running on port 3000')
    console.table(listEndpoints(server))})