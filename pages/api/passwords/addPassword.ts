import type { NextApiRequest, NextApiResponse} from "next";

import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

import prisma from "@/prisma/client";
import {encrypt} from "@/util/cipher";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);

    if(!session) return res.status(401).json({ message: "Please sign in to add a password!" });
    if( req.method !== "POST") return res.status(401).json({message: "Contacted add Password API route..."})

    let { password, description, masterPassword } = req.body;

    if ( description.trim().length < 1  ) return res.status(403).json({message: "Please enter a description!"});
    if ( password.trim().length < 5 ) return res.status(403).json({message: "Passwords needs to be 5 characters long!"});

    const prismaUser = await prisma.user.findUnique({
        where: { email: session?.user?.email },
    });

    password = encrypt(password.trim(), masterPassword);

    try {
        const result = await prisma.Password.create({
            data: {
                password: password,
                description: description,
                userId: prismaUser?.id,
            }
        });
        res.status(200).json(result);
    }catch (err) {
        return res.status(403).json({message: "error has occurred while publishing the recipe"});
    }
}