import express from 'express'
import multer from 'multer'
import { savePostsPicture } from '../../lib/fs-tools.js'

const filesRouter = express.Router()


filesRouter.post('/uploadCover', multer().single('cover'), async (req, res, next) => {
    try {
        console.log("FILE: ", req.file)
        await savePostsPicture(req.file.originalname, req.file.buffer)
    
        // update userId record with the url of the newly updated avatar
        // 1. get users
        // 2. filter users by id
        // 3. if you find the user you should update that user data by adding avatar = avatarUrl
        // 4. save file
    
        // const avatarUrl = "http://localhost:3001/img/users/" + req.file.originalname
    
        // console.log(avatarUrl)
        res.send()
      } catch (error) {
        next(error)
      }
})


export default filesRouter
