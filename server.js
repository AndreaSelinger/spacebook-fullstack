var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect( process.env.MONGOLAB_URI || 'mongodb://localhost/spacebookDB', function() {
  console.log("DB connection established!!!"+ process.env.MONGOLAB_URI );
})

var Post = require('./models/postModel');

console.log('---------------------------------------------')
// var something = new Post({
//   text: 'hi', 
//   user: 'yo',
//   comments: []
// })

// something.comments.push({
//   text: 'im a comment',
//   user: 'carl',
// })

// something.save()

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
// 2) to handle adding a post
// 3) to handle deleting a post
// 4) to handle adding a comment to a post
// 5) to handle deleting a comment from a post

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/posts', function (req, res) {
  Post.find(
    function(err, data) {
      if (err) {
        return console.error(err)
      }
      res.send(data)
    }
  );
});

app.post('/posts/', function (req, res) {
  console.log(req.body);
  var Post1 = new Post({ text: req.body.text });
  Post1.save(function(err,result){
    if (err){return console.error(err);}
    res.send(result);
  });
});

app.delete('/posts/:id/', function (req, res) { 
  var id = req.params.id
  console.log(id) //{id: er98er98er, cat: 'hwskers'}
    Post.findByIdAndRemove(id, function(error, result){
    if (error) throw error;
      res.send(result); 
    })
});

app.post('/posts/:comment', function (req, res) {
  res.send(req.params.comment);
  console.log(req.params.comment);
  // var Post1 = new Post({ text: "Hello World!", user: "Bob", comments: []});
  
  // console.log(Post1);
  // Post1.save();
  
});

 
app.listen( process.env.PORT || '8080',function () {
  console.log('Port is good'+ process.env.PORT ); 
} );
