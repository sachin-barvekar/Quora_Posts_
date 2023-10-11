const exp = require("constants");
const express = require("express");
const app = express();
const path= require("path");
const { v4: uuidv4 } = require('uuid'); //uuid package;
const port = 8080;
const methodOverride= require("method-override")

app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

// index route: to get data for all ports
let posts = [
    {   id: uuidv4(),
        username :  "apnacollege",
        content : 'I love coding!'
    },
    {   id: uuidv4(),
        username :  "sachin-barvekar",
        content : 'Hard work is important to achieve success!'
    },
    {   id: uuidv4(),
        username :  "shradhakharpa",
        content : 'I got selected for my 1st intership'
    }
]

app.get("/posts",(req, res)=>{
    res.render("index.ejs", {posts})
})

//Create & add Route
app.get("/posts/new",(req, res)=>{
    res.render("new.ejs");
})
 app.post("/posts",(req, res)=>{
    let {username, content}=req.body;
    let id=uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts") //Redirecting
 })

 //view route
 app.get("/posts/:id",(req, res)=>{
    let {id}=req.params;
    let post=posts.find((p) => id=== p.id);
    res.render("show.ejs",{post})
 })

 //update route
 app.patch("/posts/:id",(req, res)=>{
    let {id}=req.params; //deconstruct id
    let newContent=req.body.content;
    let post=posts.find((p) => id=== p.id);
    post.content=newContent;
    console.log(post)
    res.redirect("/posts")
 } )

 //Edit route
 app.get("/posts/:id/edit", (req, res)=>{
    let {id}=req.params; //deconstruct id
    let post=posts.find((p) => id=== p.id);
    res.render("edit.ejs",{post})
 })

//Destroy route : Delete operation
app.delete("/posts/:id", (req, res)=>{
    let {id}=req.params; //deconstruct id
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts")
})
 app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})


 