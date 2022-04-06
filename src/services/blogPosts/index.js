import express from 'express'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import uniqid from 'uniqid'

const blogPostsRouter = express.Router()


const PathtoJSON = join(dirname(fileURLToPath(import.meta.url)), 'blogPosts.json')

const getBlogPosts = () => JSON.parse(fs.readFileSync(PathtoJSON))
const writeBlogPosts = (content) => fs.writeFileSync(PathtoJSON, JSON.stringify(content))


// POST blog
blogPostsRouter.post('/', (req, res, next) => {
    const newPost = {...req.body, _id: uniqid(), createdAt: new Date()  };
    const Posts = getBlogPosts()
    Posts.push(newPost)
    writeBlogPosts(Posts)
    res.status(201).send({id: newPost.id})
})

// GET ALL BLOG POSTS
blogPostsRouter.get('/', (req, res, next) => {
    const Posts = getBlogPosts()
    res.status(200).send(Posts)
})

// GET BLOG POST BY ID
blogPostsRouter.get('/:id', (req, res, next) => {
    const posts = getBlogPosts()
    const foundPost = posts.find(post => post._id === req.params.id)
    res.status(200).send(foundPost)
})

// PUT BLOG POST BY ID
blogPostsRouter.put('/:id', (req, res, next) => {
    const posts = getBlogPosts()
    const indexOfPost = posts.findIndex(post => post._id === req.params.id)
    const oldPost = posts[indexOfPost]
    const updatedPost = {...oldPost, ...req.body, updatedAt: new Date()}
    posts[indexOfPost] = updatedPost
    writeBlogPosts(posts)

    res.status(200).send({message: indexOfPost})
})

// DELETE BLOG POST BY ID
blogPostsRouter.delete('/:id', (req, res, next) => {
    const posts = getBlogPosts()
    const remainingPosts = posts.filter(post => post._id !== req.params.id)
    writeBlogPosts(remainingPosts)
    res.status(200).send({message: 'DELETED'})
})



export default blogPostsRouter