var express = require("express");
var router = express.Router();

import prisma from "./../../lib/prisma";

router.get("/", async function (req, res, next) {
    const products = await prisma.product.findMany();
    res.json(products);
});

export default router;
