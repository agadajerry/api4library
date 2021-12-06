import  Joi from "joi";
import fs from "fs";
import path from "path";


// data validate user input using joi package

/**
 * 
 * @param  Title: req.body.title,
  Author: req.body.author,
  datePublished: req.body.datepublish,
  Description: req.body.description,
  pageCount: req.body.pagenumber,
  Genre: req.body.genre,
  bookId: books.length+1,
  Publisher:req.body.publisher
 */
 export function validateInput(data:any){
    const JoiSchema =  Joi.object().keys({
        
      title: Joi.string().trim().required().error(new Error("Book title is require")),
      author:Joi.string().trim().min(3).max(30).required().error(new Error("Book author is require")),
      datePublished:Joi.string().error(new Error("Date published is require")),
      description: Joi.string().trim().required().error(new Error("Book description is require")),
      pageCount:Joi.number().min(1).required().error(new Error("Book page number is require")),
      genre:Joi.string().trim().min(3).required().error(new Error("Book genre is require")),
      imageUrl:Joi.string().trim().error(new Error("Image Url is require")),
      bookId:Joi.number(),
      publisher: Joi.string().trim().required()
  
    })

    
    return JoiSchema.validateAsync(data)
  }

  //login and reg validation

   export function regLoginValidation(data:any){

    const JoiSchema =  Joi.object().keys({
        
      fullname: Joi.string().trim().required().error(new Error("User  fullname  is require")),
      email: Joi.string().trim().required().email().error(new Error(" Your email is require")),
      dateOfBirth: Joi.date().error(new Error("User dob  is require")),
      password:Joi.string().min(6).required().error(new Error("Password bewteen 6 and 15 characters is require")),
      serialNo:Joi.string().required().error(new Error("Serial number is require"))
    })
    return JoiSchema.validateAsync(data);
  }


