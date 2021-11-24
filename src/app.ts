
import express, { Request, Response, NextFunction } from "express"

import createError  from "http-errors";
import path  from 'path';
import cookieParser from 'cookie-parser';
import logger  from 'morgan';
import bodyparser from "body-parser"
// const ejs  = require("express-ejs-layouts")

// import cors from "cors";

// import  indexRouter  from './routes/index';
import homeRouter  from './routes/home';
import usersRouter  from './routes/aboutbook';
import books from  './routes/books';
import process_post from  './routes/post_process';
import getbooks from  './routes/getBooks';
import deletebook from  './routes/delete';

const app = express();

app.set("view engine","ejs");
// view engine setup
app.set('views', path.join(__dirname, ".././views"));

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));//url encoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors);//cross origin resoures sharing


app.use('/aboutbook', books);
// app.use('/aboutbook', usersRouter);
app.use('/process_post', process_post);
app.use('/getbook', getbooks);
app.use('/delete', deletebook);

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
