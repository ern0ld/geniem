"use strict";
exports.__esModule = true;
require('dotenv').config();
var bodyParser = require("body-parser");
var express = require("express");
var Knex = require("knex");
var morgan = require("morgan");
var api_1 = require("./api");
var objection_1 = require("objection");
var Errors_1 = require("./Errors");
var jwt = require("./accounts")["jwt"]
const methodOverride = require("method-override")
var userquery = require("../constants")["tables"]["TODO_TABLE"]
const db  = require('knex')({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: "./todos.db"
    }
  });
  
  

// Initialize knex the SQL query builder.
var knexConfig = require('../knexfile');
exports.knex = Knex(knexConfig.development);

// Create or migrate the database:
exports.knex.migrate.latest();
// Bind the knex instance to the base Model class
objection_1.Model.knex(exports.knex);
// Unfortunately the express-promise-router types are borked. Just require():
var router = require('express-promise-router')();
var app = express()
    .use(bodyParser.json())
    .use(morgan('dev'))
    .use(router)
    .set('json spaces', 2);
// Register our REST API.
api_1["default"](router);

app.use(function (err, req, res, next) {
    if (err) {
        if (err instanceof Errors_1.HttpError) {
            res.status(err.statusCode).send({
                status: err.statusCode,
                message: err.message
            });
        }
        else {
            res.status(500).send({
                status: 500,
                message: 'An unexpected error occurred!'
            });
        }
    }
    else {
        next();
    }
});



app.set("view-engine", "ejs")
var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('Todo app listening at port %s', port);
});

app.delete("/logout", (req,res)=> {
    req.logOut();
    res.redirect("/login")
})

///////////////////////////////////////


/*const users = [];
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const initializePassport = require("./passport-config")
initializePassport(passport, 
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id))*/


/*app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false}
))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))*/


/*app.get("/users",checkAuthenticated, async (req,res)=>{
    console.log(req.body)
   res.redirect("/login")
})

app.set("view-engine", "ejs")
app.get("/",checkAuthenticated, async (req,res,next) =>{
   
    res.render("index.ejs", {name: req.user.name})

})


app.get("/login", checkNotAuthenticated,(req,res) => {

    res.render("login.ejs")
})
app.get("/register",checkNotAuthenticated, (req,res) =>{
    res.render("register.ejs")
})
app.post("/login",checkNotAuthenticated,tokenHandler, passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}



))
app.post("/register",checkNotAuthenticated, async (req,res)=>{
    const check = users.filter(user => user.username === req.body.username)
    if(check.length > 0){
        return res.status(400).send("Käyttäjätunnus on jo käytössä")
    }
    try{
        var hashedPassword = await passwHandler.getPass(req.body.password)

        users.push({
            id : Date.now().toString(),
            username: req.body.username,
            name: req.body.name,
            lastName: req.body.lastName,
            createdAt: Date.now().toString(),
            password : hashedPassword.hash

        })
        res.redirect("/login")
    }
    catch{
        res.redirect("/register")
    }
    console.log(users)
}
   )
*/

/*const testUsers = [{name : "pena"}];
//app.use(express.static("public"))
app.get("/testUsers", (req,res)=>
res.json(testUsers))

app.post("/app", (request, response) =>{
    console.log("APP SAI PYYNNÖN")
  var hash = getPassWord(request.body["password"])
  setTimeout(function(){
      response.json({
    status:"success",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(hash)} )
},1000);
    
}

)
   app.post("/testUsers", async (req,res) =>{


       //var check = await passwordHandler.hashPassword("moi")
     //  console.log(check)
    try{
        var hashedPassword = await passwHandler.getPass(req.body.password)
        console.log(hashedPassword)
        const testUser = { name: req.body.name, password: hashedPassword}
        testUsers.push(testUser)
        res.status(201).send();
    }
    catch{
        res.status(500).send();
    }
}
   )
   app.post("/testUsers/login", async (req,res) =>{
  
    const user = await testUsers.find(user => user.name === req.body.name)
    if(user === undefined){
       
        return res.status(400).send("Käyttäjää ei löydy")
    }
   
    try{ 
      if(await passwHandler.getCompare(req.body.password, user.password.hash)){
        const username = req.body.name
      
        var accessToken = await jwt.issueToken(username,3600)
        console.log(accessToken)
        res.json({accessToken: accessToken})
      
      }
      else{
          res.send("väärä salasana")
      }
    }
    catch{
        console.log("pieleen")
        res.status(500).send();
    }
});

const posts = [
{
    name: "Erkki",
    title: "Postaus"
},
{
    name: "Pekka",
    title: "Postaus2"
}

]

app.get("/posts", authenticateUser,(req,res) =>{
    
res.json(posts.filter(post => post.name === req.user))
})

/*app.post("/users", (req,res) =>{

}
)*//*
async function tokenHandler(req,res,next){
    const user = await users.find(user => user.username === req.body.username)
    if(user === undefined){
        
        return res.status(400).send("Käyttäjää ei löydy")
    }
   
    try{  
      if( await passwHandler.getCompare(req.body.password, user.password)){
        
        const username = req.body.username
      
        var accessToken = await jwt.issueToken(username,3600)
        //users.username.accessToken = accessToken
         users.filter(user => {if(user.username === username) { user.accessToken = accessToken}})
         users.filter(user => console.log(user));

        //res.json({accessToken: accessToken})
    next();
      }
      else{
          res.send("väärä salasana")
      }
    }
    catch{
        console.log("pieleen")
        res.status(500).send();
    }

}

async function checkAuthenticated(req,res, next){
    if(req.isAuthenticated()){
        
        next()
    }
    else{
    res.redirect("/login")
    }
}
function checkNotAuthenticated(req,res, next){
    if(req.isAuthenticated()){
       return res.redirect("/")
    }
    next();
}


function authenticateUser(req,res, next){
    const author = req.headers["authorization"]
    const token = author && author.split(" ")[1];
    if(token === undefined){return res.sendStatus(401)}
var status = jwt.validateToken(token)
console.log(status)
    if(!status){
        return res.sendStatus(403);}
       req.user = status["sub"];
        next();
    }
      
   


/*async function getPassWord(password){
   
   var data = {"hash": toReturn}
   const userinfo= {method : "POST",
   headers : {'Content-Type': 'application/json'},
   body: JSON.stringify(data)}
return userinfo;

//fetch("/api", fuck)
}
module.exports= checkAuthenticated;
*/

