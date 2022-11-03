var express = require("express");
var router = express.Router();

import { faker } from "@faker-js/faker";
import prisma from "../prisma";

router.put("/", async function (req, res, next) {
    let data;

    data = await prisma.UserGroup.createMany({
        data: [{ title: "Customer" }, { title: "Manager" }, { title: "Admin" }],
        skipDuplicates: true,
    });
    console.log("Groups created:", data);

    for (let i = 0; i < 10; i++) {
        data = await prisma.User.create({
            data: {
                email: faker.internet.email(),
                name: faker.name.fullName(),
                password: faker.internet.password(),
                phone: faker.phone.number("+48 91 ### ## ##"),
                userGroup: {
                    connectOrCreate: {
                        where: {
                            title: "Customer",
                        }, 
                        create: {
                            title: "Customer",
                        },
                    },
                },
            },
        });
        console.log("User created:", data);
    }

    // const data = await prisma.category.findUnique({
    //     where: {
    //         id: id,
    //     },
    // });
    res.json(data);
});

export default router;
