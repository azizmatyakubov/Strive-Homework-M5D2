import express from "express";
import fs from "fs" 
import { fileURLToPath } from "url" 
import { dirname, join } from "path" 
import uniqid from "uniqid" 



const authorsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)
const parentFolderPath = dirname(currentFilePath)
const authorsJSONPath = join(parentFolderPath, "db.json")


authorsRouter.get('/', (req, res)=> {
    const fileContent = fs.readFileSync(authorsJSONPath)
    const authorsArray = JSON.parse(fileContent)
    
    res.send(authorsArray)
})

authorsRouter.get('/:id', (req, res)=>{

     const authorId = req.params.authorId
     const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))

    const foundAuthor = authorsArray.find(author => author.id === authorId)
    res.send(foundAuthor)
})


authorsRouter.post('/', (req, res) => {
    const newAuthor = { ...req.body, id: uniqid(), avatar: 'https://ui-avatars.com/api/?name=John+Doe' }
    const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
    authorsArray.push(newAuthor)
    fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))
    res.status(201).send({ id: newAuthor.id })
})




export default authorsRouter