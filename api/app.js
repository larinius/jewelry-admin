import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
// import logger from 'morgan';
import { fileURLToPath } from 'url';
const morgan = require('morgan');

import router  from './routes/user';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const start = async () => {
    var app = express();
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
  
    app.use('/api/user', router);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
          });
    });
       
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log();
  });
};

start();
