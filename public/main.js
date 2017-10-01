var SpacebookApp = function() {

  var posts = [];

  var $posts = $(".posts");

  function _getPosts(){
    console.log('about to go tot the server code')
    $.ajax({
      method: "GET",
      url: "/posts",
      success: function (data) {
        console.log('back from the server');
        posts = data;
        _renderPosts();
        //do something we'll get there
        
          console.log(data);
      },
      error: function (err) {
          console.log(err);
      }
  })}
  
  _getPosts()
    


  _renderPosts();

  function _renderPosts() {
    $posts.empty();
    var source = $('#post-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < posts.length; i++) {
      var newHTML = template(posts[i]);
      // console.log(newHTML);
      $posts.append(newHTML);
      _renderComments(i)
    }
  }

  function addPost(newPost) {

  $.ajax({
    method: "POST",
    url: "/posts/",
    data: { text: newPost, comments: [] },
    dataType   : "json",
    success: function (data) {
    console.log(data);
    posts.push(data);
    _renderPosts();
  },
    error: function(data) {
      console.log('Error: ' + data);
    }
  });

    
  }


  function _renderComments(postIndex) {
    //use postIndex to get a post in posts array
    //get that post's id
    
    var post = $(".post")[postIndex];
    $commentsList = $(post).find('.comments-list')
    $commentsList.empty();
    var source = $('#comment-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < posts[postIndex].comments.length; i++) {
      var newHTML = template(posts[postIndex].comments[i]);
      $commentsList.append(newHTML);
    }
  }

  var removePost = function(index) {
    var id = posts[index]._id;
 
    $.ajax({
      method: "DELETE",
      url: "/posts/" + id,
      dataType   : "json",
      success: function (data) {
        console.log('heyyyy')
        console.log(data);
        posts.splice(index, 1);
        _renderPosts();
      },
      error: function(data) {
        console.log('Error: ' + data);
      }
    });

  };

  var addComment = function(newComment, postIndex) {
    posts[postIndex].comments.push(newComment);
    _renderComments(postIndex);
  };


  var deleteComment = function(postIndex, commentIndex) {
    posts[postIndex].comments.splice(commentIndex, 1);
    _renderComments(postIndex);
  };

  return {
    addPost: addPost,
    removePost: removePost,
    addComment: addComment,
    deleteComment: deleteComment,
  };
};

var app = SpacebookApp();


$('#addpost').on('click', function() {
  var $input = $("#postText");
  if ($input.val() === "") {
    alert("Please enter text!");
  } else {
    app.addPost($input.val());
    $input.val("");
  }
});

var $posts = $(".posts");

$posts.on('click', '.remove-post', function() {
  var index = $(this).closest('.post').index();;
  app.removePost(index);
});

$posts.on('click', '.toggle-comments', function() {
  var $clickedPost = $(this).closest('.post');
  $clickedPost.find('.comments-container').toggleClass('show');
});

$posts.on('click', '.add-comment', function() {

  var $comment = $(this).siblings('.comment');
  var $user = $(this).siblings('.name');

  if ($comment.val() === "" || $user.val() === "") {
    alert("Please enter your name and a comment!");
    return;
  }

  var postIndex = $(this).closest('.post').index();
  var newComment = { text: $comment.val(), user: $user.val() };

  app.addComment(newComment, postIndex);

  $comment.val("");
  $user.val("");

});

$posts.on('click', '.remove-comment', function() {
  var $commentsList = $(this).closest('.post').find('.comments-list');
  var postIndex = $(this).closest('.post').index();
  var commentIndex = $(this).closest('.comment').index();

  app.deleteComment(postIndex, commentIndex);
})
