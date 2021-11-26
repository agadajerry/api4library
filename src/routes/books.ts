import express, { Request, Response, NextFunction } from "express"
import  fs  from "fs";
var bodyParser = require('body-parser');
const router = express.Router();
import path from "path";


let books  = require("../../src/routes/appdata/db.json")
//
const filePath = path.join(__dirname, "../../src/routes/appdata/db.json");

var urlencodedParser = bodyParser.urlencoded({ extended: false }) 
let returnBookId:any

// 

/* GET books. */
router.get('/', function(req:Request, res:Response) {

  res.render("home",{
    displayBooks:books
  });
})//

/* GET books. */
router.get('/allbooks', function(req:Request, res:Response) {

  res.render("viewallbook",{
    displayBooks:books
  });
})

//posting books

router.get("/post", urlencodedParser, function (req:Request, res:Response){
  res.render("process_post");
})
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

    router.get("/update/:id", urlencodedParser, function (req:Request, res:Response){

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

            bk.Title = updateBook.title ? updateBook.Title:bk.Title,
            bk.Author = updateBook.Author ? updateBook.Author:bk.Author,
            bk.datePublished = updateBook.datePublished ? updateBook.datePublished : bk.datePublished,
            bk.Description = updateBook.description ? updateBook.Description : bk.Description,
            bk.pageCount = updateBook.pageCount ? updateBook.pageCount:bk.PageCount,
            bk.Genre = updateBook.Genre ? updateBook.Genre : bk.Genre,
            bk.Publisher = updateBook.Publisher ? updateBook.Publisher : bk.Publisher

            
            books.push(updateBook);

            writeDataToFile(filePath,books);

                    res.status(200).render("update");
                 }
                //  }else{

                //     res.status(404).json({msg:`Book details not updated...`});  
                //  }
             })
         }
    })

    //delete books

    router.get("/delete/:id", urlencodedParser, function (req:Request, res:Response){res.render("delete")})

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
    // write file function
    function writeDataToFile(filep:any,content:any){

        fs.writeFile(filep, JSON.stringify(content,null,4),  err=>{
      if(err){
        return;
      }
    })
  }

export default  router;




