var express = require("express");
var router = express.Router();
import qs from "qs";
import prisma from "../prisma";

router
    .get("/:id", async function (req, res, next) {
        const id = parseInt(req.params.id) || 0;

        const data = await prisma.order.findUnique({
            where: {
                id: id,
            },
            include: {
                user: true,
                products: true,
            },
        });
        res.json(data);
    })
    .get("/", async function (req, res, next) {
        const data = await prisma.order.findMany({
            include: {
                user: true,
                products: true,
            },
        });
        res.json(data);
    })
    .post("/", async function (req, res, next) {
        const order = qs.parse(req.body);
        console.log("Got body:", order);

        const data = await prisma.order.create({
            data: {
                user: {
                    connect: {
                        id: parseInt(order.customer.id),
                    },
                },
                details: {
                    create: {
                        phone: order.customer.phone,
                    },
                },
                products: {
                    create: {
                        product: {
                            connect: {
                                code: order.products[0].code,
                            },
                        },
                        quantity: parseInt(order.products[0].quantity),
                    },
                },
                total: parseInt(order.total),
                discount: parseInt(order.discount),
                deliveryPrice: parseInt(order.deliveryPrice),
            },
        });

        res.sendStatus(201);
    });

export default router;
