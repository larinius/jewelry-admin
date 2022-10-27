var express = require("express");
var router = express.Router();

import prisma from "../prisma";

router
    .get("/:id", async function (req, res, next) {
        const id = parseInt(req.params.id) || 0;

        const data = await prisma.cart.findUnique({
            where: {
                id: id,
            },
            include: {
                user: true,
                details: true,
            },
        });
        res.json(data);
    })
    .get("/", async function (req, res, next) {
        const data = await prisma.cart.findMany({
            include: {
                user: true,
                details: true,
            },
        });
        res.json(data);
    });

export default router;
