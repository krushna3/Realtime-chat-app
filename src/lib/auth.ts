import { NextAuthOptions } from 'next-auth';
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter';
import db from './db';
import GoogleProvider from 'next-auth/providers/google'

function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clintSecret = process.env.GOOGLE_CLIENT_SECRET

    if (!clientId || clientId.length === 0) {
        throw new Error("Missing GOOGLE_CLIENT_ID")
    }
    if (!clintSecret || clintSecret.length === 0) {
        throw new Error("Missing GOOGLE_CLIENT_SECRET")
    }

    return { clientId, clintSecret }
}

export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login'
    },
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clintSecret
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            const dbUser = (await db.get(`user:${token.id}`)) as User | null

            if (!dbUser) {
                token.id = user!.id
                return token
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image
            }
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
            }
            return session
        },

        redirect() {
            return '/dashboard'
        }
    }
}

// import { NextAuthOptions } from 'next-auth';
// import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter';
// import db from './db';
// import GoogleProvider from 'next-auth/providers/google' // Import GoogleProvider from next-auth/providers



// function getGoogleCredentials() {
//     const clientId = process.env.GOOGLE_CLIENT_ID;
//     const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

//     if (!clientId || clientId.length === 0) {
//         throw new Error('Missing GOOGLE_CLIENT_ID');
//     }
//     if (!clientSecret || clientSecret.length === 0) {
//         throw new Error('Missing GOOGLE_CLIENT_SECRET');
//     }

//     return { clientId, clientSecret };
// }

// export const authOptions: NextAuthOptions = {
//     adapter: UpstashRedisAdapter(db),
//     session: {
//         strategy: 'jwt',
//     },
//     pages: {
//         signIn: '/login',
//     },
//     providers: [
//         GoogleProvider({
//             clientId: getGoogleCredentials().clientId,
//             clientSecret: getGoogleCredentials().clientSecret,
//         }),
//         // Add other providers as needed
//     ],
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 // If the user is authenticated, you can customize the token here
//                 // This example assumes you have a user model with properties like id, name, email, and picture
//                 token.id = user.id;
//                 token.name = user.name;
//                 token.email = user.email;
//                 token.picture = user.image;
//             }
//             return token;
//         },

//         async session({ session, token }) {
//             if (token) {
//                 // If there's a token, set the session properties accordingly
//                 session.user.id = token.id;
//                 session.user.name = token.name;
//                 session.user.email = token.email;
//                 session.user.image = token.picture;
//             }
//             return session;
//         },

//         redirect() {
//             return '/dashboard';
//         },
//     },
// };
