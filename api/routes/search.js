var express = require("express");
var router = express.Router();

import prisma from "../prisma";

router.get("/:id", async function (req, res, next) {
    const id = req.params.id;
    console.log("SEARCH", id);
    const pricePerGram = await prisma.Settings.findFirst({
        where: {
            title: "price per gram",
        },
    });

    let data = await prisma.product.findMany({
        take: 10,
        where: {
            OR: [
                {
                    sku: {
                        search: id,
                    },
                },
                {
                    code: {
                        search: id,
                    },
                },
                {
                    title: {
                        search: id,
                    },
                },
            ],
        },
        include: {
            category: true,
            image: true,
        },
    });

    data = data.map((item) => {
        item.imageCount = item.image.length;
        item.price = item.weight * pricePerGram.value.price;
        return item;
    });

    res.json(data);
});

export default router;
