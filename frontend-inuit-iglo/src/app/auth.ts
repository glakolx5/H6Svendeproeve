import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { signInSchema } from "./lib/zod"
import { URLSearchParams } from "url"



export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 3600
    },
    providers: [
        Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text" },
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


                const res = await fetch("http://localhost:5033/login", {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                    headers: { "Content-Type": "application/json" }
                })
                var user = await res.json()

                user = { ...user, email: email }
                //console.log(user)
                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })],
    callbacks: {
        jwt: async ({ token, user, account }: any) => {
            //console.log(user)
            if (account && user) {
                return {
                    email: user.email,
                    tokenType: user.tokenType,
                    accessToken: user.accessToken,
                    expiresIn: user.expiresIn,
                    refreshToken: user.refreshToken,
                }
            }
            return token
        },
        session: async ({ session, token }: any) => {
            session.user.id = token.accessToken
            session.user.email = token.email

            return session
        }
    },
    secret: "supersecret",
    pages: {
        signOut: '/',
    }
})

async function refreshAccessToken(token: any) {
    try {
        console.log("refreshAccessToken starts:\n")
        const url = "http://localhost:5033/refresh" +
            new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: token.refreshToken,
            })

        const response = await fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
        })
        const refreshedTokens = await response.json()

        if (!response.ok) {
            console.log("something wrong with refreshedTokens")
        }
        return {
            ...token,
            tokenType: refreshedTokens.token_type,
            accessToken: refreshedTokens.access_token,
            expiresIn: Date.now() + refreshedTokens.expires_in,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken
        }
    }
    catch (error) {
        console.log(error)

        return {
            ...token,
            error: "RefreshAccessTokenError"
        }

    }
}