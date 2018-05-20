const Router = require('express').Router;
const BlogController = require('../controllers/blog');
let blogModel = require('../models/blog');
var blogRouter = new Router();
var fs = require('fs');
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
blogRouter.get('/:_id', (req, res) => {
 
  blogControllerIns.getBlog(req.params._id,(err, docs) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res.json(docs);
  });
});

blogRouter.post('/', (req, res) => {
  /*console.log("image path from req body", req.body.imagePath);
  console.log("Asa arata req.body", req.body);
  fs.readFile(req.body.imagePath.name, function (err, data) {
    var imageName = req.body.imagePath;
    console.log("calea catre imagine blog.js", imagePath);
    // If there's an error
    if(!imageName){
      console.log("There was an error")
      res.redirect("/");
      res.end();
    } else {
      var newPath = __dirname + "/uploads/" + imageName;
      // write file to uploads/fullsize folder
      fs.writeFile(newPath, data);
    }
  });
  req.params.imagePath=newPath;
  console.log(req.params.imagePath);
  req.body.imagePath=newPath;
*/
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
