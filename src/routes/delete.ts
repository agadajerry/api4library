

import express, { Request, Response, NextFunction } from "express"
import  fs  from "fs";
import path from "path";
  
var bodyParser = require('body-parser');
let books  = require("../../src/routes/appdata/db.json")
const filePath = path.join(__dirname, "../../src/routes/appdata/db.json");

const router  = express.Router()

// Create application/x-www-form-urlencoded parser

var urlencodedParser = bodyParser.urlencoded({ extended: false }) 

// router.get("/", urlencodedParser, function (req:Request, res:Response){

    // router.delete("/:id", urlencodedParser, function (req:Request, res:Response){

    //     const foundBk  = books.find((bid:any)=>bid.bookId
    //     ===parseInt(req.params.id));
    //     if(!foundBk){
    //       return  res.status(404).json({msg: `the book  with specified ID is not found`})
    //     }
    //     books = books.filter((bk:any)=>bk.bookId!= parseInt(req.params.id))
    //     writeDataToFile(filePath, books);
    //     res.render("delete");
    // })

router.delete("/:id",(req:Request,res:Response)=>{

    const foundBk  = books.find((bid:any)=>bid.bookId
        ===parseInt(req.params.id));
        if(!foundBk){
          return  res.status(404).json({msg: `the book  with specified ID is not found`})
        }
        books = books.filter((bk:any)=>bk.bookId!= parseInt(req.params.id))
        writeDataToFile(filePath, books);
        // res.redirect("delete");
        res.json({msg:`Book is removed from the shelf successsfully...`})

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
