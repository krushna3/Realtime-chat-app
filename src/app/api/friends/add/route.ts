import { fetchRedis } from "@/helpers/redis"
import { authOptions } from "@/lib/auth"
import db from "@/lib/db"
import { pusherServer } from "@/lib/pusher"
import { toPusherKey } from "@/lib/utils"
import { addFriendValidator } from "@/lib/validations/add-friend"
import { getServerSession } from "next-auth"
import { z } from 'zod'

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const { email: emailToAdd } = addFriendValidator.parse(body.email)

        // console.log('get id', emailToAdd)
        const idToAdd = await fetchRedis('get', `user:email:${emailToAdd}`) as string

        if (!idToAdd) {
            return new Response('This person dose not exist.', { status: 400 })
        }

        const session = await getServerSession(authOptions)

        if (!session) {
            return new Response('Unauthorize', { status: 401 })
        }

        if (idToAdd === session.user.id) {
            return new Response('You cannt add yourself as a friend', { status: 400 })
        }

        // check if user is alrady  added
        const isAlradyAdded = (await fetchRedis('sismember', `user:${idToAdd}:incoming_friend_requests`, session.user.id)) as 0 | 1

        if (isAlradyAdded) {
            return new Response('Already added this user', { status: 400 })
        }

        // check if user is alrady  added
        const isAlradyFriend = (await fetchRedis('sismember', `user:${session.user.id}:friends`, idToAdd)) as 0 | 1

        if (isAlradyFriend) {
            return new Response('Already in your friend list', { status: 400 })
        }

        // validate request, send friend request
        await pusherServer.trigger(
            toPusherKey(`user:${idToAdd}:incoming_friend_requests`),
            'incoming_friend_requests',
            {
                senderId: session.user.id,
                senderEmail: session.user.email,
            }
        )

        await db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id)

        return new Response('OK')
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request payload', { status: 422 })
        }
        console.log(error)
        return new Response('Invalid request', { status: 400 })
    }
}