import express from "express";
import uniqid from "uniqid" 
import { getAuthors, savePostsPicture, writeAuthors } from "../../lib/fs-tools.js";
import createError from "http-errors"
import multer from "multer";
import {join} from 'path'

const authorsRouter = express.Router()

// 1. POST 
authorsRouter.post('/', async (req, res, next) => {
    try {
        const authors = await getAuthors()
        const newAuthor = { ...req.body, id: uniqid(), avatar: 'https://ui-avatars.com/api/?name=John+Doe' }
        authors.push(newAuthor)
        writeAuthors(authors)
        res.status(201).send({ id: newAuthor.id })
    } catch (error) {
        next(error)
    }
})

// 2. GET 
authorsRouter.get('/', async (req, res, next)=> {
    try {
        const authors = await getAuthors()
        res.status(200).send(authors)
    } catch (error) {
        next(error)
    }
})

// 3. GET BY ID 
authorsRouter.get('/:id', async (req, res, next)=>{
    try {
        const authors = await getAuthors()
        const foundAuthor = authors.find(author => author.id === req.params.id)
        if(foundAuthor) {
            res.status(200).send(foundAuthor)
        } else {
            next(createError(404, `Author with id ${req.params.id} not found`))
        }
    } catch (error) {
        next(error)
    }
})

// 4. PUT BY ID 
authorsRouter.put('/:id', async (req, res, next) => {
    try {
        const authors = await getAuthors()
        const findIndexOfAuthor = authors.findIndex(author => author.id === req.params.id)
        if(findIndexOfAuthor !== -1) {
            const oldAuthor = authors[findIndexOfAuthor]
            const updatedAuthor = {...oldAuthor, ...req.body, updatedAt: new Date()}
            authors[findIndexOfAuthor] = updatedAuthor
            writeAuthors(authors)
            res.status(200).send({message: 'changed'})
        }
        
    } catch (error) {
        next(error)
    }
})

// 5. DELETE BY ID 
authorsRouter.delete('/:id', async (req,res, next) => {
    try {
        const authors = await getAuthors()
        const remainingAuthors = authors.filter(author => author.id !== req.params.id)
        writeAuthors(remainingAuthors)
        res.status(200).send({message: 'DELETED'})
    } catch (error) {
        next(error)
    }
})

// 6. POST PICTURE
authorsRouter.post('/:id/uploadAvatar', multer().single('coverAuthor'),  async (req, res, next) => {
    try {
        await savePostsPicture(req.params.id + '.jpg', req.file.buffer)
        res.send({message: 'Photo saved'})

        console.log("FILE: ", req.file)


    } catch (error) {
        next(error)
    }
})



export default authorsRouter