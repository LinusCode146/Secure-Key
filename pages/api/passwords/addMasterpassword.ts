import type { NextApiRequest, NextApiResponse} from "next";

import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

import prisma from "@/prisma/client";
import hash from "@/util/hashing";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);

    if(!session) return res.status(401).json({ message: "Please sign in to make a recipe!" });
    if( req.method !== "POST") return res.status(401).json({message: "Contacted add Masterpassword API route..."})

    const { password } = req.body;

    if ( password.trim().length < 5 ) return res.status(403).json({message: "Password needs to be 5 characters long!"});

    const prismaUser = await prisma.user.findUnique({
        where: { email: session?.user?.email },
    });

    const existingMasterPassword = await prisma.MasterPassword.findUnique({
        where: { userId: prismaUser?.id }
    })

    if (existingMasterPassword) {
        return res.status(403).json({message: "You have an existing Masterpassword"});
    }

    const hashedMasterpassword = hash(password.slice());

    try {
        const result = await prisma.MasterPassword.create({
            data: {
                password: hashedMasterpassword,
                userId: prismaUser?.id,
            }
        })
        res.status(200).json(result);
    }catch (err) {
        return res.status(403).json({message: "error has occurred while publishing the recipe"})
    }
}