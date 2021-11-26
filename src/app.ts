
import express, { Request, Response, NextFunction } from "express"

import createError  from "http-errors";
import path  from 'path';
import cookieParser from 'cookie-parser';
import logger  from 'morgan';
import bodyparser from "body-parser"
// const ejs  = require("express-ejs-layouts")

import cors from "cors";

// import  indexRouter  from './routes/index';

import books from  './routes/books';
import bookapi from  './routes/bookapi';

const app = express();

app.use(cors);//cross origin resoures sharing

app.set("view engine","ejs");
// view engine setup
app.set('views', path.join(__dirname, ".././views"));

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));//url encoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routing for various pages
app.use('/', books);// comment this during testing
app.use('/bookapi', bookapi);

// catch 404 and forward to error handler
app.use(function(err:any, req:Request, res:Response, next:NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err:any, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
