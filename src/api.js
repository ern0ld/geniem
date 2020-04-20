"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var User_1 = require("./models/User");
var Todo_1 = require("./models/Todo");
//Salasanatable
//Password table
var Password_1 = require("./models/Password");
var Errors_1 = require("./Errors");
var passwordHandler = require("./accounts")["password"]
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const initializePassport = require("./passport-config")
const methodOverride = require("method-override")
//Käyttäjien tunnistamisen apuvälineitä
//User authorization functions
const authHandler = require("./authHandler")
//Alustetaan passport
//Initialize passport
initializePassport(passport, 
    username => authHandler.getUserInfo(username),
    id => authHandler.getUserId(username))

exports["default"] = (function (router) {
    var express = require("express")
   
    router.use(express.urlencoded({extended:false}))
    router.use(flash())
    router.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false}
    ))
    //Asetetaan reititin käyttämään passportia
    //Set router to use passport
    router.use(passport.initialize())
    router.use(passport.session())
    //Tämän avulla ohitetaan käyttäjän uloskirjautumisessa oleva POST-käsky ja kutsutaan passportin logOut-metodia
    //With this we override the POST-method when user logs out and invoke the logOut-method of passport
    router.use(methodOverride("_method"))
    var bodyParser = require("body-parser");
    router.use(bodyParser.json())

   /********* Mikäli ymmärsin oikein, ei käyttäjätietoja tarvitse näyttää käyttäjille ***********/
//    router.get('/users',authHandler.checkAuthenticated,authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        
  //      var users;
    //    return __generator(this, function (_a) {
      //      switch (_a.label) {
        //        case 0: return [4 /*yield*/, User_1["default"].query()];
          //      case 1:
            //        users = _a.sent();
                //      res.send(users);
            //     return [2 /*return*/];
          //  }
        //});
      // }); });

 /*********  Sama myös kaikkien todojen suhteen ***********/

    //router.get('/todos',authHandler.checkAuthenticated, authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
       // var todos;
      //  return __generator(this, function (_a) {
        //    switch (_a.label) {
          //      case 0: return [4 /*yield*/, Todo_1["default"].query()];
            //    case 1:
              //      todos = _a.sent();
                //    res.send(todos);
                //    return [2 /*return*/];
          //  }
       // });
   // }); });

   //Haetaan käyttäjän todot käyttäjän id:n perusteella
   //Get user todos based on user id
    router.get('/todos/:id',authHandler.checkAuthenticated, authHandler.tokenAuthentication, function (req, res) {
     
        return __awaiter(void 0, void 0, void 0, function () {
        var id, todo;
        return __generator(this, function (_a) { 
            switch (_a.label) {
                case 0:
                    id = req.user.id.toString()

                    if (!id || Number.isInteger(id)){
                        throw new Errors_1.BadRequestError('Invalid TodoID!');}
                        console.log("päästiin eteenpäin")
                    return [4 /*yield*/, Todo_1["default"].query().where({ userid: id })];
                case 1:
                   
                    todo = _a.sent();
                    res.send(todo)
                    if (!todo)
                        throw new Errors_1.NotFoundError('No such Todo!');
                      
                        return [2 /*return*/, todo];
            }
        });
    }); });

  //Käyttäjän kotisivu, tarkastetaan vielä passportin kanssa käyttäjän status ennen sivun näyttämistä
  //Users homepage, check with passport is user authenticated before showing the page
    router.get("/",authHandler.checkAuthenticated, async (req,res,next) =>{
        
       res.render("index.ejs", {name: req.user.name})
    
    })
    //Kirjautumissivu, näytetään mikäli käyttäjä ei ole kirjautunut
    //Login page, show if user is not logged in
    router.get("/login", authHandler.checkNotAuthenticated,(req,res) => {
        res.render("login.ejs")
    })
    //Rekisteröitymissivu, näytetään mikäli käyttäjä ei ole kirjautunut
    //Register page, show if user is not logged in
    router.get("/register",authHandler.checkNotAuthenticated, (req,res) =>{
      
        res.render("register.ejs")
    })
    //Ohjataan rekisteröitymisen jälkeen pikaisesti tätä kautta ja luodaan token
    //Redirect and create token to logged or registered user
    router.get("/tok", authHandler.tokenHandler,(req,res) =>{
        res.redirect("/")
    })
    //Tarkastetaan onko kirjautumistiedot oikein ja ohjataan hakemaan token, muussa tapauksessa takaisin login-sivulle
    //Check if log in info is correct and redirect to get token, otherwise redirect back to login page
    router.post("/login",authHandler.checkNotAuthenticated, passport.authenticate("local",{
        successRedirect: "/tok",
        failureRedirect: "/login",
        failureFlash: true
    }
     ))
     //Käyttäjän toimintoja, suoritetaan tuplavarmistus ja tarkastetaan ovatko käyttäjä ja token sallittuja, koska varmassa vara parempi
     //Users actions, check if user and token is authenticated
     router.post("/addTodo",authHandler.checkAuthenticated,authHandler.tokenAuthentication, async (req,res) =>{
       await addTodo(req.user.name, req.body.description,req.user.id)
    res.redirect("/")
     }
    
     )
//Rekisteröidään uusi käyttäjä mikäli ehdot täyttyvät
//Register new user if the conditions are met
    router.post("/register",authHandler.checkNotAuthenticated, async (req,res)=>{
        if(await usernameExists(req.body.username)){
            return res.status(400).send("Käyttäjätunnus on jo käytössä")
        }
        try{ 
            await addUser(req.body.username,req.body.name,req.body.lastName)
            var hashedPassword = await passwordHandler.hashPassword(req.body.password)
           
         
            if(!await addHashed(req.body.username, hashedPassword.hash)){
                return res.status(400).send("Jokin meni pieleen")
            }
            res.redirect("/login")
        }
        catch{
            res.redirect("/register")
        }
    }
       )
    
    //Käyttäjän toiminto, päivitetään todo annetun id:n perusteella
    //User's action, update todo based on given id
router.post("/updateTodo", authHandler.tokenAuthentication, async (req,res) =>{
   
const result = await upDateTodo(req.user.id,req.body.todoId,req.user.name, req.body.updatedesc);
   
    if(result === 1){res.redirect("/")}
    else{
        res.status(500).send("Tietoja ei päivitetty");
    }
  })


   
});


    //Tarkastetaan onko rekisteröitävä käyttäjänimi jo käytössä
    //Check if new username is already taken
   async function usernameExists(username){
        const isThere = await User_1["default"].query().where({
            username: username
          });
          if(isThere.length > 0){
              return true
          }
          else{
              return false;
          }
    }
    //Lisätään uusi käyttäjä tietokantaa
    //Add new user to database
    async function addUser(username,name,lastName){
 
      await User_1["default"].query().insert({
            username: username,
            name:name,
            lastName: lastName
            
          });
    }
    //Lisätään uusi todo tietokantaan
    //Add new todo to database
    async function addTodo(name, desc,userId){
       
        userId = parseInt(userId)
        const toAdd= {userId:userId,description: name+" Remember: "+desc, title:desc}
        await Todo_1["default"].query().insert(toAdd)


    }
    //Päivitetään olemassaoleva todo annetun id:n perusteella
    //Update existing todo based on given id
    async function upDateTodo(userId,id,name,description){
        userId = parseInt(userId)
        id = parseInt(id)
     
        const patch= {userId:userId,description: name+" Remember: "+description, title:description}
        const update = await Todo_1["default"].query().where("userId", '=' ,userId).where( "id", '=' , id ).patch(patch)
      
        return update
    }
    //Lisätään tietokantaan salasanasta luotu hash, tunnisteena käyttäjänimi
    //Add the password hash to database
    async function addHashed(username,hash){
        const add = await Password_1["default"].query().insert({
            username: username,
            hash: hash
          })
        if(add !== undefined){
            return true
        }
        return false;
    }

   