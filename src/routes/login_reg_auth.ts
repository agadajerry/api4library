import fs from "fs";
import path from "path";
import bodyParser, { json } from "body-parser";
import express,{Request, Response} from "express";
import bcrypt  from "bcrypt"
require("dotenv").config();
import {regLoginValidation} from "./validateData";
let  flash  =   require("connect-flash");
let session  =  require("express-session")
const  jwt  =  require("jsonwebtoken");
const {v4: uuidv4}  = require("uuid");





let usersFilePath:string  =  path.join(__dirname,"../../src/routes/appdata/auth.json");
let urlencodedParser = bodyParser.urlencoded({ extended: false }) 


const router = express.Router();

// users interface
 export  interface Users {
    fullname: string;
    email:string;
    dateOfBirth:string;
    password: string;
}


// session and flash views
router.use(session({
    secret: 'jerrysoft',
    cookie: {maxAge:6000},
    resave: false,
    saveUninitialized: true
  }));
  router.use(flash())


//--------------- registration of new user -----------------------


router.get("/register",urlencodedParser, (req:Request, res:Response)=>{
    res.render("register",{
     message:   req.flash("message"),
     messageerror: req.flash("messageerror")
    });
})
router.post('/register',urlencodedParser,async (req:Request,res:Response) => {

    try{

        
        //check for empty fields

        if(!req.body.fullname||!req.body.email
            ||!req.body.password){
            req.flash('message', 'Some of the text field are empty...');
           res.redirect("/register")
           return
            }
   // read the existing file and append to it content

   fs.readFile( usersFilePath,{encoding:"utf-8"}, async (err,data)=>{

       if(err){ 

        throw new Error("error for file absent")
    }
        //check if user already register
 
       const dataValue  = JSON.parse(data);
        const emailExisted = dataValue.filter((user:Users) => user.email == req.body.email )[0];
        if(emailExisted){

        //    res.json({msg:`The user ${req.body.username} already registered`});
           
           req.flash('message', ' The email entered already exist in the database. Choose another one..');
           res.redirect("/register")
           return

        }else{

                const password = req.body.password;
                const hashpassword =  await bcrypt.hash(password,10);

                const newReg =   {
                serialNo: uuidv4(),
                fullname:req.body.fullname,
                email:req.body.email,
                dateOfBirth:req.body.dateofbirth,
                password:hashpassword
            }
            
            const validateData = await regLoginValidation(newReg);


            dataValue.push(validateData);
            writeDataToFile(usersFilePath,dataValue);

            //token here
            
            const maxAge  = 1*24*60*60
            const access_token = jwt.sign({email:validateData.email}, process.env.ACCESS_TOKEN_SECRET_KEY,{
                expiresIn:maxAge
            });
            res.cookie("jwt",access_token,{httpOnly:true})

        res.redirect("/")//take the user to login page

        }
   })
}catch(error){

    // console.log(error);
    
    req.flash('messageerror', 'Invalid data entered...');
    res.redirect("/register")
    return
}

})


//---------------------- Login  implementation  for users---------------------------
router.get('/', (req:Request,res:Response) => {
        
    res.status(201).render("login",{

            message:   req.flash("message"),
            messageerror: req.flash("messageerror")
           
    });
})

//Login routes
router.post('/', (req:Request, res:Response)=>{
   
    const email = req.body.email;
    const password = req.body.password;

  
    if(!req.body.email.trim().length || !req.body.password.length){
        req.flash('message', ' Invalid login credentials. Try again..');
        res.redirect("/")
        return
    }
     //check if user exist or not
     fs.readFile(usersFilePath,{encoding:"utf-8"}, async (err,data)=>{
        if(err) return new Error(JSON.stringify({msg:'No such files exist'}))

        const dataValue  = JSON.parse(data);

        const userData = dataValue.filter((user:Users)=>user.email ===  req.body.email)[0]

     
            
        if(!userData){
        //    res.json({msg:'Invalid username'})  
            req.flash('message', ' Invalid login credentials...');
           res.redirect("/")
           return
        }
            
            let isMatch = await  bcrypt.compare(password,userData.password);

            if(!isMatch){

            //  return   res.status(400).json({msg: "the password does not matched..."})
              
            req.flash('message', ' Invalid login credentials...');
            res.redirect("/")
            return

            }

             //token here
             const maxAge  = 1*24*60*60
             const access_token = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET_KEY,{
                 expiresIn:maxAge
             } );
                
            res.cookie("jwt",access_token,{httpOnly:true})


            //  res.json({ msg:"User successfully login..."});

             res.status(201).redirect("dashboard");
            
        })
       

})



  // write file function
  function writeDataToFile(filep:any,content:any){

    fs.writeFile(filep, JSON.stringify(content,null,4),  err=>{
  if(err){
    return;
  }
})
}


export default router