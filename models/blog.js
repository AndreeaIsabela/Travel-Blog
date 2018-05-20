var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BlogSchema = new Schema(
  {
    author: {type: String, required: true, max: 100},
    title: {type: String, required: true, max: 100},
    date: {type: Date,required: true},
    content:{type:String, required: true},
   //imagePath:[String]
  }
);


//Export model
module.exports = mongoose.model('Blog', BlogSchema);