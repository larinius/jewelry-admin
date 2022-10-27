var express = require("express");
var router = express.Router();

import prisma from "../prisma";

router
    .get("/:id", async function (req, res, next) {
        const id = parseInt(req.params.id) || 0;

        const data = await prisma.order.findUnique({
            where: {
                id: id,
            },
            include: {
                User: true,
                OrderProducts: true,
            },
        });
        res.json(data);
    })
    .get("/", async function (req, res, next) {
        const data = await prisma.order.findMany({
            include: {
                User: true,
                OrderProducts: true,
            },
        });
        res.json(data);
    });

export default router;
