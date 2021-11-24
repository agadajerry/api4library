import express, { Request, Response, NextFunction } from "express"
import  fs  from "fs";
const router = express.Router();
import path from "path";


let books  = require("../../src/routes/appdata/db.json")
//
const filePath = path.join(__dirname, "../../src/routes/appdata/db.json");
// 



/* GET book by id . */

router.get('/:id', function(req:Request, res:Response) {

    const idFound =  books.some((bs:any)=>bs.bookId === parseInt(req.params.id))
    if(idFound){
        const returnBookId:any  = books.filter((items:any)=>items.bookId
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
    router.put("/:id",(req:Request,res:Response,next:NextFunction)=>{
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

                    res.status(200).json({msg: `The book  with ID ${req.params.id} is updated`})
                 }
                //  }else{

                //     res.status(404).json({msg:`Book details not updated...`});  
                //  }
             })
         }
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




