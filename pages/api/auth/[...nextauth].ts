import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import SpotifyProvider from "next-auth/providers/spotify";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from '../../../prisma/client'
import {Adapter} from "next-auth/adapters";

export const authOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    secret: process.env.AUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
}

export default NextAuth(authOptions);