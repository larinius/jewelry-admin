import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
const morgan = require('morgan');

import userRouter  from './routes/user';
import productRouter  from './routes/product';

const start = async () => {
    var app = express();
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
  
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);

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
