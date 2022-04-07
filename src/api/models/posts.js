import res from 'express/lib/response'
import fs from 'fs'

const PATH = './services/blogPosts/blogPosts.json'

class Post {
    get() {
        return this.readPosts()
    }

    readPosts() {
        let rawData = fs.readFileSync(PATH)
        let posts = JSON.parse(rawData)
        return posts
    }
}

module.exports = Post;