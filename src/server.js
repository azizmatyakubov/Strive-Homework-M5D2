import express from 'express'
import authorsRouter from './services/authors/index.js'
import blogPostsRouter from './services/blogPosts/index.js'
import listEndpoints from "express-list-endpoints"

const server = express()

server.use(express.json())

server.use('/authors', authorsRouter)
server.use('/blogPosts', blogPostsRouter)


server.listen(3000, () => {
    console.log('Server is running on port 3000')
    console.table(listEndpoints(server))})