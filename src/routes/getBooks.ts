import express, { Request, Response, NextFunction } from "express"
var router = express.Router();

let books  = require("../../src/routes/appdata/db.json")


/* GET users listing. */
router.get('/', function(req:Request, res:Response) {

  res.render("home",{
    displayBooks:books
  });
});



export default  router;
