import blogs from "../data/blog.json";

function getBlog(id) {
    return blogs.filter(blog => { return blog.id === parseInt(id) })[0];

}

function getFilteredPosts( posts, tag = '' ){

    if( tag !== undefined && tag !== null && tag !== '' ){
        posts = posts.filter( post => { 
            return ( post.tags !== undefined && post.tags !== null ) && post.tags.includes(parseInt(tag)) 
        })
    }

    return posts;
}

export { getBlog, getFilteredPosts };