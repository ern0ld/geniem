"use strict";
exports.__esModule = true;
require('dotenv').config();
var jwt = require("jsonwebtoken");
var HOUR = 3600;
var SECRET = process.env.JWT_SIGNING_SECRET;
var REFRESH = process.env.REFRESH_TOKEN_SECRET;
var getSecondsNow = function () { return Math.floor(new Date().getTime() / 1000); };
/**
 * Issues a new signed JSON Web token.
 * @param sub The subject (token holder's) identifier
 * @param validFor How long should the token stay valid (in seconds)
 */
exports.issueToken = async function (sub, validFor) {
    if (validFor === void 0) { validFor = HOUR; }
    var iat = getSecondsNow();
    var exp = iat + Math.floor(validFor);
    var payload = {
        sub: sub,
        iat: iat,
        exp: exp
    };
    
    return jwt.sign(payload, SECRET);
};
exports.issueRefreshToken = async function (sub, validFor) {
    console.log(REFRESH)

    if (validFor === void 0) { validFor = HOUR; }
    var iat = getSecondsNow();
    var exp = iat + Math.floor(validFor);
    var payload = {
        sub: sub
    };

    return jwt.sign(payload, REFRESH);
};
/**
 * Validates the given JSON web token.
 * @param token The signed JSON Web token to validate
 * @returns The token payload if the token was valid
 * @throws An error if token was invalid
 */
exports.validateToken = function (token) {
    var toReturn;
    jwt.verify(token, SECRET, (err,user) =>{
        if(err){toReturn = false;}
        toReturn = user;
      
    });
    return toReturn;
};
exports.validateRefreshToken = function (token) {
    var toReturn;
    jwt.verify(token, REFRESH, (err,user) =>{
        if(err){toReturn = false;}
        toReturn = user;
      
    });
    return toReturn;
};
exports.test = async function (string){
    console.log("toimii")
  }
  