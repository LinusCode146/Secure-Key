import { PrismaClient } from '@prisma/client'
import axios from "axios";

// @ts-ignore
const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") {
    // @ts-ignore
    globalThis.prisma = client
}

export default client