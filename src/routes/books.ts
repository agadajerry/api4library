import express, { Request, Response, NextFunction } from "express"
import  fs  from "fs";
var bodyParser = require('body-parser');
const router = express.Router();
import path from "path";
import {validateInput} from "../routes/validateData"
let  flash  =   require("connect-flash");
let session  =  require("express-session")
const {v4: uuidv4}  = require("uuid");
import {authoriseUser} from "./authMiddleware";



let books = require("../../src/routes/appdata/db.json");





//
const filePath = path.join(__dirname, "../../src/routes/appdata/db.json");

// let books:any =  readDb(book);

// var urlencodedParser = bodyParser.urlencoded({ extended: false }) 

let returnBookId:any

// 

// session and flash views
router.use(session({
  secret: 'jerrysoft',
  cookie: {maxAge:6000},
  resave: false,
  saveUninitialized: false
}));
router.use(flash())




/* GET books. */
router.get('/dashboard',authoriseUser, function(req:Request, res:Response) {
  res.render("home",{
    displayBooks:books
  })
   
});

/* GET books. */
router.get('/allbooks', function(req:Request, res:Response) {

  res.render("viewallbook",{
    displayBooks:books
  });
})

//posting books

router.get("/post", function (req:Request, res:Response){
  res.render("process_post",{
    message: req.flash("message"),
    messageerror: req.flash("messageerror"),
  });
})
router.post('/post', async function (req:Request, res:Response) {  
 // Prepare output in JSON format  
try{
 const newBook = {
  title: req.body.title,
  author: req.body.author,
  datePublished: req.body.datepublish,
  description: req.body.description,
  pageCount: req.body.pagenumber,
  genre: req.body.genre,
  bookId: books.length+1,
  publisher:req.body.publisher,
  imageUrl:req.body.image
}

  //validate incoming data
  const validateData = await validateInput(newBook);

   books.push(validateData);

   writeDataToFile(filePath, books)

   req.flash('message', ' Book details saved successfully...');

  res.redirect("/post")
}catch(err){
  console.log(err);  
  req.flash("messageerror", "Input field is incomplete... ")
  res.redirect("/post")
}
})


/* GET book by id . */

router.get('/book/:id', function(req:Request, res:Response) {

    const idFound =  books.some((bs:any)=>bs.bookId === parseInt(req.params.id))
    if(idFound){
         returnBookId  = books.filter((items:any)=>items.bookId
        == parseInt(req.params.id)); 
        // res.json(returnBookId);
        res.render("aboutbook",{

          aboutbook:returnBookId
        })
    }else{
        res.status(404).json({msg:` the Book with ID No:  ${req.params.id}  not found...`})
    }
  
    });


    //update books details

    router.get("/update/:id", function (req:Request, res:Response){

      const idF =  books.some((bs:any)=>bs.bookId === parseInt(req.params.id)); 
      if(idF){
           const returnBook  = books.filter((items:any)=>items.bookId
          == parseInt(req.params.id)); 
          res.render("update",{
            bookupdate:returnBook
          })
      }
    })
    router.put("/update/:id",(req:Request,res:Response)=>{
        const foundBk  = books.find((bid:any)=>bid.bookId
         ===parseInt(req.params.id))
         if(foundBk){

        

             const updateBook =  req.body;
             books.forEach((bk:any)=>{
              
              if(bk.bookId === parseInt(req.params.id)){

            bk.title = updateBook.title ? updateBook.title:bk.title,
            bk.author = updateBook.author ? updateBook.author:bk.author,
            bk.datePublished = updateBook.datePublished ? updateBook.datePublished : bk.datePublished,
            bk.description = updateBook.description ? updateBook.description : bk.description,
            bk.pageCount = updateBook.pageCount ? updateBook.pageCount:bk.PageCount,
            bk.genre = updateBook.genre ? updateBook.genre : bk.genre,
            bk.publisher = updateBook.publisher ? updateBook.publisher : bk.publisher,
            bk.imageUrl = updateBook.imageUrl ? updateBook.imageUrl : bk.imageUrl

            
            // books:updateBook;

            writeDataToFile(filePath,books);
            res.status(200).redirect("/allbooks")

                 }
                 else{

                    res.status(404).json({msg:`Book details not updated...`});  
                 }
             })
         }
    })

    //delete books

    router.get("/delete/:id", function (req:Request, res:Response){res.render("delete")})

    router.delete("/delete/:id",(req:Request,res:Response)=>{

      const foundBk  = books.find((bid:any)=>bid.bookId
          ===parseInt(req.params.id));
          if(!foundBk){
            
            return  res.status(404).send({msg: `the book  with specified ID is not found`})


          }

            books = books.filter((bk:any)=>bk.bookId!= parseInt(req.params.id))
            writeDataToFile(filePath, books);
            res.render("delete");
            
          
       
  
      })
    // write to a file function
    function writeDataToFile(filep:any,content:any){

        fs.writeFile(filep, JSON.stringify(content,null,4),  err=>{
      if(err){
        return;
      }
    })
  }


  function readDb(filePat:string){
    try{
      fs.readFile(filePat,{encoding:"utf-8"},(err,data)=>{
        if(err) return console.log("no file to read from...");
        const book =  JSON.parse(data);

        return book;
      })
    }catch(err){

      console.log(err);
      
    }
   
  }
export default  router;




