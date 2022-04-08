import express from 'express'
import uniqid from 'uniqid'
import { getBlogPosts, savePostsPicture, writeBlogPosts } from '../../lib/fs-tools.js'
import createError from "http-errors"
import multer from 'multer'

const blogPostsRouter = express.Router()


// POST blog
blogPostsRouter.post('/', async (req, res, next) => {
    await console.log(req.body, 'this is body')
    try {
        const newPost = {...req.body, _id: uniqid(), createdAt: new Date()  }; // construct new post object

        const Posts = await getBlogPosts() // get all posts array
        
        Posts.push(newPost) // push new post object to array
        
        writeBlogPosts(Posts) // write file 
        
        res.status(201).send({id: newPost._id}) // send status and message
    } catch (error) {
        next(error)
    }
})

// GET ALL BLOG POSTS
blogPostsRouter.get('/', async (req, res, next) => {
    try {
        const Posts = await getBlogPosts() // get all posts
        res.status(200).send(Posts) // send all posts
    } catch (error) {
        next(error)
    }
})

// GET BLOG POST BY ID
blogPostsRouter.get('/:id', async (req, res, next) => {

    try {
        const posts = await getBlogPosts() // get all posts

        const foundPost = posts.find(post => post._id === req.params.id) // get post by id
        if(foundPost) {
            res.status(200).send(foundPost) // sending post by id
        } else {
            next(createError(404, `Book with id ${req.params.id} not found! `)) // sending error with 404
        }
      
    } catch (error) {
        next(error)
    }
})

// PUT BLOG POST BY ID
blogPostsRouter.put('/:id', async (req, res, next) => {

    try {
        const posts = await getBlogPosts() // get all posts

        const indexOfPost = posts.findIndex(post => post._id === req.params.id) // get index of post by params id
    
        if(indexOfPost !== -1) { // checking database has post 
            const oldPost = posts[indexOfPost] // get post
            const updatedPost = {...oldPost, ...req.body, updatedAt: new Date()} // update post
            posts[indexOfPost] = updatedPost // change post
            writeBlogPosts(posts) // write post
            res.status(200).send({id: updatedPost._id}) // send psot
        } else {
            next(createError(404, `Post with id ${req.params.id} not found!`))
        }
    
    } catch (error) {
        next(error)
    }
    
})

// DELETE BLOG POST BY ID
blogPostsRouter.delete('/:id', async (req, res, next) => {
    try {
        const posts = await getBlogPosts() //get posts
        const remainingPosts = posts.filter(post => post._id !== req.params.id) //get all posts which doesn't have same id with req.params.id
        if(remainingPosts) {
            writeBlogPosts(remainingPosts) // write remaining posts
            res.status(200).send({message: 'DELETED'}) // send message
        } else {
            next(createError(404, `Post with id ${req.params.id} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

// GET ALL COMMENTS BY ID
blogPostsRouter.get('/:id/comments', async (req, res, next) => {
    try {
        const posts = await getBlogPosts()
        const post = posts.find(post => post._id === req.params.id)
        res.status(200).send(post.comments)
    } catch (error) {
        next(error)
    }
})

// POST NEW COMMENTS
blogPostsRouter.post('/:id/comments', async (req, res, next) => {
    try {

        const posts = await getBlogPosts() // Get all posts
        const indexOfPost = posts.findIndex(post => post._id === req.params.id) // get posts by id
        if(indexOfPost !== -1) {
            const oldComments = posts[indexOfPost].comments // get comments by post id
            oldComments.push({...req.body, _id: uniqid()})
            writeBlogPosts(posts)
            res.status(201).send({message: 'New comment added'})
        }
    } catch (error) {
        next(error)
    }
})


// POST COVER
blogPostsRouter.post('/:id/uploadCover', multer().single('coverPost'), async(req, res, next) => {
    try {
        const postId = req.params.id
        const url = `http://localhost:5000/img/posts/${postId}.jpg`
        await savePostsPicture(postId + '.jpg', req.file.buffer)
        const posts = await getBlogPosts()
        const foundPost = posts.find(post => post._id === postId)
        foundPost.cover = url;
        writeBlogPosts(posts)
        res.status(201).send({message: 'Image is uploaded'})
    } catch (error) {
        next(error)
    }
})



export default blogPostsRouter