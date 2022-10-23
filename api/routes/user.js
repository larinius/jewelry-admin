var express = require("express");
var router = express.Router();

import prisma from "./../../lib/prisma";

router.get("/", async function (req, res, next) {
    const users = await prisma.user.findMany();
    res.json(users);
});

export default router;
