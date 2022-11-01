const morgan = require("morgan");
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import express from "express";
import fileUpload from "express-fileupload";

import brandRouter from "./routes/brand";
import cartRouter from "./routes/cart";
import categoryRouter from "./routes/category";
import dummyRouter from "./routes/dummy";
import migrateRouter from "./routes/migrate";
import orderRouter from "./routes/order";
import orderstatusRouter from "./routes/orderstatus";
import priceuploadRouter from "./routes/priceupload";
import productRouter from "./routes/product";
import searchRouter from "./routes/search";
import userRouter from "./routes/user";

const start = async () => {
    var app = express();

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    // Middlewares
    app.use(morgan("tiny"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(fileUpload());
    app.use(bodyParser.urlencoded({ extended: true }));

    // All routes
    app.use("/api/brand", brandRouter);
    app.use("/api/orderstatus", orderstatusRouter);
    app.use("/api/cart", cartRouter);
    app.use("/api/category", categoryRouter);
    app.use("/api/order", orderRouter);
    app.use("/api/product", productRouter);
    app.use("/api/user", userRouter);
    app.use("/api/dummy", dummyRouter);
    app.use("/api/priceupload", priceuploadRouter);
    app.use("/api/search", searchRouter);
    app.use("/api/migrate", migrateRouter);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err,
        });
    });

    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log();
    });
};

start();
