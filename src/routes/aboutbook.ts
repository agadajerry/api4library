import express, { Request, Response, NextFunction } from "express"
var router = express.Router();

/* GET book by id . */
router.get('/:id', function(req:Request, res:Response) {

  // res.render("aboutbook");
});

export default  router;
