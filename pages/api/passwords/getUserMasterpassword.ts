import type { NextApiRequest, NextApiResponse} from "next";

import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

import prisma from "@/prisma/client";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);

    if(!session) return res.status(401).json({ message: "Please sign in to make a recipe!" });
    if( req.method !== "GET") return res.status(401).json({message: "Contacted get User's Masterpassword API Route..."})

    const prismaUser = await prisma.user.findUnique({
        where: { email: session?.user?.email },
    });

    const existingMasterPassword = await prisma.MasterPassword.findUnique({
        where: { userId: prismaUser.id }
    })

    if (!existingMasterPassword) {
        return res.status(403).json({message: "You have to make a Masterpassword first"});
    }

    try {
        const data = await prisma.MasterPassword.findUnique({
            where: {userId: prismaUser.id },
        });
        res.status(200).json(data);
    }catch (err) {
        return res.status(403).json({message: "error has occurred while publishing the recipe"})
    }
}