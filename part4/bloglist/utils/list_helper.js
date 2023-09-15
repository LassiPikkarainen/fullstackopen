const dummy = (blogs) => {
    return 1
  }
  


const totalLikes = (blogs) => {
    let total = 0
    let i = 0;

    while (i < blogs.length) {
        total += blogs[i].likes
        i++
    }
    return total
}


const favouriteBlog = (blogs) => {
    let favblog = blogs[0]
    let i = 0;

    while (i < blogs.length) {
        if (blogs[i].likes > favblog.likes){
            favblog = blogs[i]
        }
        i++
    }
    return favblog
}

const mostBlogs = (blogs) => {
    let authors = []
    let i = 0;
    while (i < blogs.length) {
        let author = blogs[i].author

        let j = 0
        let found = false
        while (j < authors.length) {
            if (authors[j].author == author) {
                authors[j].blogs++
                found = true
                break
            }
            j++
        }
        if (found == false) {
            let newauthor = {
                author: author,
                blogs: 1
            }
            authors.push(newauthor)
        }
        i++
    }
    
    let k = 0;
    bestAuthor = authors[0]

    while (k < authors.length) {
        if (authors[k].blogs > bestAuthor.blogs){
            bestAuthor = authors[k]
        }
        k++
    }
    return bestAuthor
}

const mostLikes = (blogs) => {
    let authors = []
    let i = 0;
    while (i < blogs.length) {
        let author = blogs[i].author

        let j = 0
        let found = false
        while (j < authors.length) {
            if (authors[j].author == author) {
                authors[j].likes += blogs[i].likes
                found = true
                break
            }
            j++
        }
        if (found == false) {
            let newauthor = {
                author: author,
                likes: blogs[i].likes
            }
            authors.push(newauthor)
        }
        i++
    }
    
    let k = 0;
    mostLiked = authors[0]

    while (k < authors.length) {
        if (authors[k].likes > mostLiked.likes){
            mostLiked = authors[k]
        }
        k++
    }
    return mostLiked
}


  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
  }