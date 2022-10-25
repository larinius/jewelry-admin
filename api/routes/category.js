var express = require("express");
var router = express.Router();

import prisma from "../prisma";

router.get("/", async function (req, res, next) {
    const categories = await prisma.category.findMany();
    res.json(categories);
});

export default router;
