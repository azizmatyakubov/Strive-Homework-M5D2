import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import {join, dirname} from 'path'


const {readJSON, writeJSON, writeFile} = fs

const postsPublicFolderPath = join(process.cwd(), "./public/img/posts")
const authorsPublicFolderPath = join(process.cwd(), "./public/img/authors")

export const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), '../data/')
const authorsJSONPath = join(dataFolderPath, 'authors.json')
const blogPostsJSONPath = join(dataFolderPath, 'blogPosts.json')


export const getAuthors = () => readJSON(authorsJSONPath)
export const writeAuthors = (content) => writeJSON(authorsJSONPath, content)


export const getBlogPosts = () => readJSON(blogPostsJSONPath)
export const writeBlogPosts = (content) => writeJSON(blogPostsJSONPath, content)

export const savePostsPicture = (filename, contentAsBuffer) => writeFile(join(postsPublicFolderPath, filename), contentAsBuffer)
export const saveAuthorsPicture = (filename, contentAsBuffer) => writeFile(join(authorsPublicFolderPath, filename), contentAsBuffer)

export const getPostsReadableStream = () => fs.createReadStream(blogPostsJSONPath)