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


// Initialize knex the SQL query builder.
var knexConfig = require('../knexfile');
//exports.knex = Knex(knexConfig.development);
// Create or migrate the database:
//exports.knex.migrate.latest();
// Bind the knex instance to the base Model class
//objection_1.Model.knex(exports.knex);
// Unfortunately the express-promise-router types are borked. Just require():
/*var router = require('express-promise-router')();
var app = express()
    .use(bodyParser.json())
    .use(morgan('dev'))
    .use(router)
    .set('json spaces', 2);

api_1["default"](router);

var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log('Todo app listening at port %s', port);
});


let refreshTokens = []
var passwHandler = require("./test");
var passwordHandler = require("./accounts")["password"]

const testUsers = [{name : "pena"}];
app.use(express.static("public"))
app.get("/testUsers", (req,res)=>
res.json(testUsers))

router.post("/api", (request, response) =>{
    console.log("i got a request")
   // console.log(request.body)
})

   app.post("/testUsers", async (req,res) =>{
    try{
        var hashedPassword = await passwHandler.getPass(req.body.password)
        const testUser = { name: req.body.name, password: hashedPassword}
        testUsers.push(testUser)
        res.status(201).send();
    }
    catch{
        res.status(500).send();
    }
}
   )
   app.post("/token", async (req,res) =>{
    const refreshToken = req.body.token;
    if(refreshToken === undefined){return res.sendStatus(401)}
    if(!refreshTokens.includes(refreshToken)){
        return res.sendStatus(403)}
    var check = jwt.validateRefreshToken(refreshToken)
    if(check === false) {
        console.log("hylätty")
        return res.sendStatus(403)}
        console.log(check)
    const accessToken = await generateAccessToken(check["sub"])
   
    res.json({accessToken:accessToken})
})

   app.post("/testUsers/login", async (req,res) =>{
  
    const username = req.body.name
    console.log(username)
    const user = {name : username}

    const accessToken = await generateAccessToken(username)
    const refreshToken = await jwt.issueRefreshToken(username, 45)
    refreshTokens.push(refreshToken)
    console.log(accessToken)
    res.json({accessToken: accessToken, refreshToken: refreshToken})
   })

   async function generateAccessToken(username){
       return jwt.issueToken(username, 30)
   }

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

app.post("/users", (req,res) =>{

}
)

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
      */