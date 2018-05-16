class BlogController {

    constructor(blogModel) {
        this.blogs = blogModel;
      }

      getBlogs(done) {
        this.blogs.find({}, done);
      }
      getBlog(id,done){
          this.blogs.find({id:id},done);
      }

      addBlog(blog, done) {
        let newBlog = new this.blogs(blog);
        newBlog.save(done);
      }
    
      deleteBlog(id, done) {
       
        this.blogs.find({id: id}).remove()
        .exec(done);
      }

 
}

module.exports =BlogController;