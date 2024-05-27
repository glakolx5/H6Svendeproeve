import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { signInSchema } from "./lib/zod"

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {

                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const { email, password } = await signInSchema.parseAsync(credentials)
                console.log(email, password)

                const res = await fetch("http://localhost:5033/login", {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                console.log(res)
                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) token = user as unknown as { [key: string]: any }
            console.log(token)
            return token
        },
        session: async ({ session, token }: any) => {
            session.user = { ...token }
            return session
        }
    },
    secret: "supersecret"
})