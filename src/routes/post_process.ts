

import express, { Request, Response, NextFunction } from "express"
import  fs  from "fs";
import path from "path";
  
var bodyParser = require('body-parser');
let books  = require("../../src/routes/appdata/db.json")

//
const filePath = path.join(__dirname, "../../src/routes/appdata/db.json");

// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false }) 

const router = express.Router();

router.get("/", urlencodedParser, function (req:Request, res:Response){
    res.render("process_post");
})
router.post('/', urlencodedParser, function (req:Request, res:Response) {  
   // Prepare output in JSON format  

   const newBook = {
    Title: req.body.title,
    Author: req.body.author,
    datePublished: req.body.datepublish,
    Description: req.body.description,
    pageCount: req.body.pagenumber,
    Genre: req.body.genre,
    bookId: books.length+1,
    Publisher:req.body.publisher
 }
     books.push(newBook);

     writeDataToFile(filePath, books)

     res.status(201).render("process_post",{
        Title: req.body.title,
        Author: req.body.author,
        datePublished: req.body.datepublish,
        Description: req.body.description,
        pageCount: req.body.pagenumber,
        Genre: req.body.genre,
        bookId: books.length+1,
        Publisher:req.body.publisher
     });

})



  // write file function
  function writeDataToFile(filep:string,content:any){

    fs.writeFile(filep, JSON.stringify(content,null,4),  err=>{
  if(err){
    return;
  }
})
}


export default  router;
