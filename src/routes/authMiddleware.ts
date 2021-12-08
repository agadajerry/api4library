
import {Request,Response,NextFunction} from "express";
const jwt  = require("jsonwebtoken");



 export function authoriseUser(req:Request, res:Response,next:NextFunction){

try{
   
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,(err:any,decodedToken:any)=>{

            if(err){
                res.redirect("/")
            }else{
                next()
            }
        })
    }else{
        res.redirect("/")
    }
}catch(err){
    
    res.sendStatus(401)
}  
}

/*
 const authHeder =  req.headers["authorization"];
    const token = authHeder && authHeder.split(" ")[1];

    if(token == null){ return res.sendStatus(401)}

   let user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY as string);

    req.body.user = user.username;
    next();

    }*/