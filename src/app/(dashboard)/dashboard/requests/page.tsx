import FriendRequests from '@/components/FriendRequests'
import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Friend Requests | Realtime Chat App',
    description: 'Created By Krushna_3 | NEXT JS',
}

const page = async () => {
    const session = await getServerSession(authOptions)
    if (!session) notFound()

    const incommingSenderIds = (
        await fetchRedis('smembers', `user:${session.user.id}:incoming_friend_requests`
        )
    ) as string[]

    const incomingFriendRequests = await Promise.all(
        incommingSenderIds.map(async (senderId) => {
            const sender = (
                await fetchRedis('get', `user:${senderId}`
                )
            ) as string
            const senderParse = JSON.parse(sender) as User
            return {
                senderId,
                senderEmail: senderParse.email,
            }
        })
    )


    return (
        <main className='pt-8'>
            <h1 className='font-bold text-5xl mb-8 text-black dark:text-white'>Add a friend</h1>
            <div className='flex flex-col gap-4'>
                <FriendRequests incomingFriendRequests={incomingFriendRequests} sessionId={session.user.id} />
            </div>
        </main>
    )
}

export default page