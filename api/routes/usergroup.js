var express = require("express");
var router = express.Router();

import prisma from "../prisma";

router
    .get("/", async function (req, res, next) {
        const data = await prisma.UserGroup.findMany();
        res.json(data);
    });

export default router;
