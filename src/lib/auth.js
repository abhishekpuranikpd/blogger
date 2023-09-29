
import bcrypt from "bcryptjs"

import CredentialsProvider from "next-auth/providers/credentials"
// import EmailProvider from "next-auth/providers/email"
// import GitHubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"
import { db } from "./db"
import NextAuth from "next-auth"
import { User } from "@prisma/client"

import { PrismaAdapter } from "@next-auth/prisma-adapter"


export const authOptions = {
    // huh any! I know.
    // This is a temporary fix for prisma client.
    // @see https://github.com/prisma/prisma/issues/16117

    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/login",
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "email",
                },
                password: {
                    label: "Password",
                    type: "text",
                },
            },
            async authorize(credentials) {
                // check to see if email and password is there
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please enter an email and password")
                }

                console.log(credentials,"Log");


                // check to see if user exists
               

                const user = await db.User.findFirst({where :{ email: credentials.email }})

             console.log(user,"user");

                // if no user was found


                if (!user) {
                    throw new Error("No user found")
                }

                // check to see if password matches
                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                )


                // if password does not match
                if (!passwordMatch) {
                    throw new Error("Incorrect password")
                }
                return user;
            },
        }),
        // GitHubProvider({
        //     clientId: env.GITHUB_CLIENT_ID,
        //     clientSecret: env.GITHUB_CLIENT_SECRET,
        // }),
        // GoogleProvider({
        //     clientId: env.GOOGLE_CLIENT_ID,
        //     clientSecret: env.GOOGLE_CLIENT_SECRET,
        // }),
        // EmailProvider({
        //     server: {
        //         host: env.EMAIL_SERVER_HOST,
        //         port: env.EMAIL_SERVER_PORT,
        //         auth: {
        //             user: env.EMAIL_SERVER_USER,
        //             pass: env.EMAIL_SERVER_PASSWORD,
        //         },
        //     },
        //     from: env.EMAIL_FROM,
        // }),
    ],
    adapter: PrismaAdapter(db),
    callbacks: {
        async session({ token, session }) {

            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email

            }

            return session
        },
        async jwt({ token, user }) {
           
              const dbUser = await db.User.findFirst({where :{ email: token.email }})
            if (!dbUser) {
                console.log(dbUser);

                throw new Error("No user found")
                if (user) {
                    token.id = user?.id
                }
                return token
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                // role: dbUser.role,
                // institutionId: dbUser.institutionId,
            }
        },
    },
}