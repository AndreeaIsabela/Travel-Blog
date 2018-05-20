const Router = require('express').Router;
const BlogController = require('../controllers/blog');
let blogModel = require('../models/blog');
var blogRouter = new Router();
var fs = require('fs');
var multer=require('multer');
var upload=multer({dest:"uploads/"});
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

blogRouter.post('/upload',upload.single('image'),(req,res,next)=>{
  var tmp_path = req.file.path;

  var target_path = 'public/images/' + req.file.originalname;

 
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
});

blogRouter.post('/', (req, res) => {
 
  blogControllerIns.addBlog(req.body, (err, result) => {
    imageA=req.params.imagePath;
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    console.log(result);
    res.status(201).end();
  });
});

module.exports = blogRouter;
