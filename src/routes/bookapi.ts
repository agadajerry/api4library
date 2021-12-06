import express, { Request, Response, NextFunction } from "express"
import  fs  from "fs";
var bodyParser = require('body-parser');
const router = express.Router();
import path from "path";
import {authoriseUser} from "./authMiddleware";



let books  = require("../../src/routes/appdata/db.json")
//
const filePath = path.join(__dirname, "../../src/routes/appdata/db.json");

var urlencodedParser = bodyParser.urlencoded({ extended: false }) 

// 

/* GET books. */
router.get('/', authoriseUser, function(req:Request, res:Response) {

  res.status(200).send(books);
})

//posting books


router.post('/post', urlencodedParser, function (req:Request, res:Response) {  
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

   res.status(201).send(newBook);

})


/* GET book by id . */

router.get('/book/:id', function(req:Request, res:Response) {

    const idFound =  books.some((bs:any)=>bs.bookId === parseInt(req.params.id))
    if(idFound){
        const returnBookId:any  = books.filter((items:any)=>items.bookId
        == parseInt(req.params.id)); 

        res.status(200).json(returnBookId);
       
    }
  
    });


    //update books details
    router.put("/update/:id",(req:Request,res:Response,next:NextFunction)=>{

             const updateBook =  req.body;
             books.filter((bk:any)=>{
                 if(bk.bookId === parseInt(req.params.id)){

            bk.title = updateBook.title ? updateBook.title:bk.Title,
            bk.author = updateBook.author ? updateBook.author:bk.author,
            bk.datePublished = updateBook.datePublished ? updateBook.datePublished : bk.datePublished,
            bk.description = updateBook.description ? updateBook.description : bk.description,
            bk.pageCount = updateBook.pageCount ? updateBook.pageCount:bk.pageCount,
            bk.genre = updateBook.genre ? updateBook.genre : bk.genre,
            bk.publisher = updateBook.publisher ? updateBook.publisher : bk.publisher

            
            books: updateBook;

            writeDataToFile(filePath,books);

              res.status(200).json({msg: `The book  with ID ${req.params.id} is updated`})
                 }
                 else{

                    res.status(404).json({msg:`Book details not updated...`});  
                 }
             })
        
    })

    //delete books

    router.delete("/delete/:id",(req:Request,res:Response)=>{

      const foundBk  = books.find((bid:any)=>bid.bookId
          ===parseInt(req.params.id));
          if(!foundBk){
            
            return  res.status(404).send({msg: `the book  with specified ID is not found`})


          }

            books = books.filter((bk:any)=>bk.bookId!= parseInt(req.params.id))
            writeDataToFile(filePath, books);
            res.status(200).send({msg: `book with is removed`})
            
          
       
  
      })
    // write file function
    function writeDataToFile(filep:any,content:any){

        fs.writeFile(filep, JSON.stringify(content,null,4),  err=>{
      if(err){
        return;
      }
    })
  }

export default  router;




