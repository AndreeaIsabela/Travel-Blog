const Router = require('express').Router;
const BlogController = require('../controllers/blog');
let blogModel = require('../models/blog');
var blogRouter = new Router();

// injecting the blog model in the controller instance
var blogControllerIns = new BlogController(blogModel);

blogRouter.get('/', (req, res) => {
  blogControllerIns.getBlogs((err, docs) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res.json(docs);
  });
});
blogRouter.get('/:id', (req, res) => {
  blogControllerIns.getBlog(req.param.id,(err, docs) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res.json(docs);
  });
});

blogRouter.post('/', (req, res) => {
  blogControllerIns.addBlog(req.body, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    console.log(result);
    res.status(201).end();
  });
});

module.exports = blogRouter;
