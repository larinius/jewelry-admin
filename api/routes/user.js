var express = require("express");
var router = express.Router();

import prisma from "../prisma";

router
    .get("/:id", async function (req, res, next) {
        const id = parseInt(req.params.id) || 0;

        const data = await prisma.user.findUnique({
            where: {
                id: id,
            },
            include: {
                wishlist: true,
                cart: true,
                prefs: true,
                userGroup: true,
                // products: { include: { product: true } },
                order: { include: { status: true}},
            },
        });
        res.json(data);
    })
    .get("/", async function (req, res, next) {
        const data = await prisma.user.findMany({
            include: {
                userGroup: true,
            },
        });
        res.json(data);
    });

export default router;