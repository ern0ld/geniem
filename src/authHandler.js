//Hallitaan autentikointia

var jwt = require("./accounts")["jwt"]
var passwordHandler = require("./accounts")["password"]
var Password_1 = require("./models/Password");
var User_1 = require("./models/User");

    //Tallennetaan token/tunniste userdataan, joten se kulkee aina käyttäjän pyyntöjen mukana
        //Ilmeisesti localstorage tai cookietkaan eivät ole hyviä vaihtoehtoja tietoturvamielessä
        //Save the accesstToken to userdata so it is passed with user requests
exports.tokenHandler = async function tokenHandler(req,res,next){
    try{  
   
         const username = req.user.username
         var accessToken = await jwt.issueToken(username,3600)
    
         req.user.accessToken = accessToken
         next();
   
     }
     catch{
 
         res.status(500).send("Virhe tunnisteen luomisessa");
     }
 
 }
  //tarkastetaan passportin isAuthenticated-metodilla onko käyttäjä autentikoitu, mikäli on, päästetään eteenpäin
   //Muussa tapauksessa ohjataan takaisin login-sivulle
   //Check if user is authenticated with passport's isAuthenticated method
exports.checkAuthenticated = async function checkAuthenticated(req,res, next){
 
    if(req.isAuthenticated()){
      next();
    }
    else{
    res.redirect("/login")
    }
}

 //Mikäli käyttäjä on kirjaututunut, on turha näyttää register- tai login-sivuja, ohjataan kotisivulle
    //If the user is logged in, no need to show register or login pages anymore
exports.checkNotAuthenticated = function checkNotAuthenticated(req,res, next){
   
    if(req.isAuthenticated()){
       return res.redirect("/")
    }
    
    next();
}
//Tarkastetaan onko token voimassa
//Check if token is valid
exports.tokenAuthentication = function authenticateToken(req,res, next){
  
   
    const token = req.user.accessToken
 
    if(token === undefined){return res.sendStatus(401)}
var status = jwt.validateToken(token)

    if(!status){
        return res.sendStatus(403);
    }
        next();
    }
      
    //Hakee hashin tietokannasta käyttäjänimen perusteella 
    //Gets hash for the user password from database
   exports.getHashed = async function getHashed(username){
        const check = await Password_1["default"].query().select("hash").where({
            username: username
          })
          if(check !== undefined){
              return check[0].hash
          }
          return false;
    }
    //Hakee käyttäjän id:n käyttäjänimen perusteella
    //Gets userId based on username
    exports.getUserId = async function getUserId(username){
        const check = await User_1["default"].query().select("id").where({
            username: username
          })
          if(check !== undefined){
            return check[0].id
        }
        return false;
    }
    //Hakee käyttäjätiedot käyttäjänimen perusteella
    //Gets users information based on username
    exports.getUserInfo= async function getUserInfo(username){
        const check = await User_1["default"].query().select("*").where({
            username: username
          })
          if(check !== undefined){
            
            return check[0]
        }
        return undefined;
    
    }
