//Passport hoitaa autetinkointia ja serialisoi käyttäjän tiedot 
//Passport authenticates user and serializes user data

//Käytetään paikallista strategiaa, koska paikallisuuden tukeminen on tärkeää näinä vaikeina aikoina
//We use local strategy with passport
const LocalStrategy = require('passport-local').Strategy
const passwordHandler = require("./accounts")["password"]
const authHandler = require("./authHandler")
//Alustetaan passport ja tarkastetaan ovatko käyttäjän tiedot oikein
//Initialize passport and check the user information
function initialize(passport,getUserByUsername,getUserById){
    const authenticateUser = async (username, password, done) =>{
    
        const user = await getUserByUsername(username)
        console.log(user)
            if(user === undefined){
                return done(null, false, {message:"Ei käyttäjää tällä käyttäjänimellä"});
            }
            const hashPass= await authHandler.getHashed(username)
        
    if(hashPass === undefined){
        return done(null, false, {message: "Salasana on väärä"})
    }
            try{
if(await passwordHandler.comparePassword(password, hashPass)){
   //mikäli kaikki meni hyvin tähän asti, palautetaan käyttäjä
   //If all goes well, return the user
return done(null, user)
}
else{
    return done(null, false, {message: "Salasana on väärä"})
}
            }
            catch(error){
                    return done(error)
            }
    } 
    
passport.use(new LocalStrategy({usernameField: "username"}, authenticateUser))
//Serialisoidaan käyttäjädata myöhempää käyttöä varten, käyttäjän tiedot kulkevat tulevien pyyntöjen mukana, esim request.user.id sisältää userId:n
//Serialize the user data for further use, now on the user data is passed on with oncoming requests, for example request.user.id contains userId
passport.serializeUser((user,done) => {return done(null, user)})
passport.deserializeUser((id, done) =>{
    return done(null, id)
})

}

module.exports = initialize;