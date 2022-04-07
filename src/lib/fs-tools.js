import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import {join, dirname} from 'path'


const {readJSON, writeJSON, writeFile} = fs

export const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), '../data/')
const authorsJSONPath = join(dataFolderPath, 'authors.json')
const blogPostsJSONPath = join(dataFolderPath, 'blogPosts.json')


export const getAuthors = () => readJSON(authorsJSONPath)
export const writeAuthors = (content) => writeJSON(authorsJSONPath, content)


export const getBlogPosts = () => readJSON(blogPostsJSONPath)
export const writeBlogPosts = (content) => writeJSON(blogPostsJSONPath, content)


