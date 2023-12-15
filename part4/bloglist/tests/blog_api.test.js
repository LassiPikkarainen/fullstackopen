const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')

const api = supertest(app)
const Blog = require('../models/blog')

const initBlogs = [
    {
        title: "blog",
        author: "name",
        url: "test.com",
        likes: 123
      },
      {
        title: "blog2",
        author: "name",
        url: "test.com",
        likes: 123
      }
]

beforeEach(async () => {  
    await Blog.deleteMany({})  
    let blogObject = new Blog(initBlogs[0])  
    await blogObject.save()  
    blogObject = new Blog(initBlogs[0])  
    await blogObject.save()
})

test('like count defaults to 0', async () => {
    await Blog.deleteMany({})

    const blog = {
        title: "blog without likes",
        author: "name",
        url: "test.com"
      }

    await api.post('/api/blogs').send(blog)
    
    const response = await api.get('/api/blogs')

    const newblog = response.body[0]
    expect(newblog.likes).toBe(0)

})


test('all blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.length
    expect(contents).toBe(2)
})

test('id field is named id', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body
    let i = 0
    while (i < contents.length){
        expect(contents[i].id).toBeDefined()
        i++
    }
    
})

test('adding blog increases the count by one', async () => {
    const original = await api.get('/api/blogs')
    const originalLength = original.body.length

    const blog = {
        title: "blog3",
        author: "name",
        url: "test.com",
        likes: 123
      }
    const response = await api.post('/api/blogs').send(blog)

    const newContents = await api.get('/api/blogs')
    const newLen = newContents.body.length

    expect(newLen).toBeGreaterThan(originalLength)
})
/*
test('adding blog without title or url returns 400', async () => {
    const blogWithoutName = {
        author: "name",
        likes: 123
      }
    await api.post('/api/blogs').send(blogWithoutName)
    .expect(400)

    
})
*/

describe('deletion of a blog', () => {
    test('Deleting an existing blog works', async () => {
        const originalBlogs = await api.get('/api/blogs')
        IDOfBlogToDelete = originalBlogs.body[0].id
        await api.delete(`/api/blogs/${IDOfBlogToDelete}`).send()
        .expect(200)
    })
    
    test('deleting a blog without a valid id returns 400', async () => {
        await api.delete(`/api/blogs/notavalidID`).send()
        .expect(400)
    })
 })

 describe('editing a blog', () => {
    test('Editing an existing blog returns the new values', async () => {
        const blog = {
            title: "blog3",
            author: "name",
            url: "test.com",
            likes: 123
          }

        const originalBlogs = await api.get('/api/blogs')
        IDOfBlogToEdit = originalBlogs.body[0].id
        const response = await api.put(`/api/blogs/${IDOfBlogToEdit}`).send(blog)

        const newblog = response.body
        delete newblog.id
        expect(newblog).toEqual(blog)
        

    })
    
    test('editing a blog without a valid id returns 400', async () => {
        const blog = {
            title: "blog3",
            author: "name",
            url: "test.com",
            likes: 123
          }
        await api.put(`/api/blogs/notavalidID`).send(blog)
        .expect(400)
    })
 })


afterAll(async () => {
  await mongoose.connection.close()
})