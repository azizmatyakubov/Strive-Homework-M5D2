# Strive-Homework-M5D2

**AUTHOR**

GET [http://localhost:5000/authors](http://localhost:5000/authors) ———→   gives all authors

POST [http://localhost:5000/authors](http://localhost:5000/authors) ———→ Post new author  {name, surname, email, dateOfBirth}

GET  [http://localhost:5000/authors](http://localhost:5000/authors)/:id ——→ gives author by id

PUT [http://localhost:5000/authors](http://localhost:5000/authors)/:id ——→ change author {name, surname, email, dateOfBirth}

DELETE [http://localhost:5000/authors](http://localhost:5000/authors)/:id —> delete author by id 

POST  [](http://localhost:5000/blogPosts/etxcy5e3cl1p4efj9/uploadCover)[http://localhost:5000/authors/:id/uploadAvatar](http://localhost:5000/authors/etxcy51ugl1nallap/uploadAvatar) — upload new image to author by id  

{form-data: coverAuthor}

**POST**

GET [http://localhost:5000/blogPosts](http://localhost:5000/blogPosts) ———> gives all posts

POST [http://localhost:5000/blogPosts](http://localhost:5000/blogPosts) ——→ post new post {category, title, content}

GET [http://localhost:5000/blogPosts](http://localhost:5000/blogPosts)/:id —>   gives post by id

PUT [http://localhost:5000/blogPosts](http://localhost:5000/blogPosts)/:id —→  change post by id {category, title, content}

DELETE [http://localhost:5000/blogPosts](http://localhost:5000/blogPosts)/:id → delete post by id

POST  [http://localhost:5000/blogPosts/:id/uploadCover](http://localhost:5000/blogPosts/etxcy5e3cl1p4efj9/uploadCover) — upload new image to post by id 

{form-data: coverPost}

**POST COMMENTS**

GET [http://localhost:5000/blogPosts/:id/comments](http://localhost:5000/blogPosts/etxcy5b58l1oz1j0q/comments) —→ gives all comments for post

POST [http://localhost:5000/blogPosts/:id/comments](http://localhost:5000/blogPosts/etxcy590kl1pmcq79/comments) —>post new comment {title, text}
