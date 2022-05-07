const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const app = express();


// const homeStartingContent = "Apple wants a weekend or expensive dui want to decorate. Which is always the creator nor the duration of her life. Carrots carrots just been running a lot. Product lived in this. Financing yeast rice vegetarian or clinical portal. That they are not members, nor members of the Donec ultrices tincidunt arcu. A lot of television targeted at the undergraduate nutrition. Of life, and the mountains shall be born, ultricies quis, congue in magnis dis parturient. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. The founder of basketball and football propaganda graduated drink at the arc. Performance skirt smile at any hate for hate vulputate. Running a lot of television targeted at the undergraduate nutrition.";
// const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
// const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const homeStartingContent="Welcome to our daily journal.Let's get started by adding new blog posts just by clicking on new blog on the top right corner."
const posts = [];
var firstPost={
  title:"Day 1",
  content:"Hello there, I have made this blogging website using HTML, CSS, Bootstrap, Javascript, Node.js and Express. I have also used EJS for templating and layouts."
};
posts.push(firstPost);
var secondPost={
  title:"Day 2",
  // content:"Hello there, I have made this blogging website using HTML, CSS, Bootstrap, Javascript, Node.js and Express. I have also used EJS for templating and layouts."
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus at urna condimentum mattis pellentesque. Et malesuada fames ac turpis. Id faucibus nisl tincidunt eget nullam non. Adipiscing diam donec adipiscing tristique risus. Nulla pellentesque dignissim enim sit amet venenatis urna. Tincidunt ornare massa eget egestas purus viverra accumsan in. Odio morbi quis commodo odio aenean sed adipiscing diam donec. Sed faucibus turpis in eu mi. Ut tellus elementum sagittis vitae et leo duis ut diam. Hendrerit dolor magna eget est. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Sit amet consectetur adipiscing elit ut. Euismod quis viverra nibh cras pulvinar mattis. Sodales ut etiam sit amet nisl. Velit scelerisque in dictum non consectetur a. Tempor orci eu lobortis elementum. Vestibulum rhoncus est pellentesque elit. Dui id ornare arcu odio ut sem nulla. Sed felis eget velit aliquet sagittis id consectetur. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Odio ut sem nulla pharetra diam sit amet nisl. Ultrices vitae auctor eu augue ut lectus. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh sed. Malesuada fames ac turpis egestas. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus. Neque laoreet suspendisse interdum consectetur libero id faucibus nisl. Commodo nulla facilisi nullam vehicula ipsum a. Tortor condimentum lacinia quis vel eros donec. Elit at imperdiet dui accumsan. Ultrices gravida dictum fusce ut placerat. Ac odio tempor orci dapibus ultrices. Blandit turpis cursus in hac habitasse platea dictumst. Sed vulputate odio ut enim. Non curabitur gravida arcu ac tortor. Sed risus ultricies tristique nulla. Pellentesque adipiscing commodo elit at."
};
posts.push(secondPost);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home");     //initially posts=empty
});

app.get("/homepage",function(req,res){
  res.render("homepage",{ homeContent: homeStartingContent, posts: posts });
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {

  const post = {                              //const=>as we don't have to change it anywhere
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("homepage");

});

app.post("/contact",function(req,res){
  res.render("success");
});



app.get("/posts/:postTitle", function (req, res) {    
                                                        //using dynamic url by express routing
  const postName=_.lowerCase(req.params.postTitle);
  posts.forEach(function(post){
    var title=_.lowerCase(post.title);
    if(title===postName)
    {
      res.render("post",{Title:post.title,Content:post.content});
    }
  });
});


app.listen(process.env.PORT || 12000, function () {
  console.log("Server started on port 12000");
});
