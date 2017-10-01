var mongoose = require('mongoose');

//design the two schema below and use sub docs 
//to define the relationship between posts and comments

//you don't need a comments collection
//you only need a posts collection

var commentSchema = new mongoose.Schema({
    text: String,
    user: String,
  });

  var postSchema = new mongoose.Schema({
    text: String,
    user: String,
    comments: [commentSchema]
  });

var Post = mongoose.model('Post', postSchema)

// var Post1 = new Post({ text: "Hello World!", user: "Bob", comments: []});

// console.log(Post1);
// Post1.save();


module.exports = Post




  
