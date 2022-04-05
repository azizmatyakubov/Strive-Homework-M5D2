import express from "express";
import fs from "fs" 
import { fileURLToPath } from "url" 
import { dirname, join } from "path" 
import uniqid from "uniqid" 



const authorsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)
const parentFolderPath = dirname(currentFilePath)
const usersJSONPath = join(parentFolderPath, "db.json")


authorsRouter.get('/', (req, res)=> {
    const fileContent = fs.readFileSync(usersJSONPath)
    const authorsArray = JSON.parse(fileContent)
    // res.send(authorsArray)
    res.send(authorsArray)
})

authorsRouter.get('/:id', (req, res)=>{

     const authorId = req.params.authorId
     const authorsArray = JSON.parse(fs.readFileSync(usersJSONPath))

    const foundAuthor = authorsArray.find(author => author.id === authorId)
    res.send(foundAuthor)
})





export default authorsRouter