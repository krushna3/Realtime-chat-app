import ChatInput from '@/components/ChatInput'
import Messages from '@/components/Messages'
import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { messageArrayValidator } from '@/lib/validations/message'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Chats | Realtime Chat App',
    description: 'Created By Krushna_3 | NEXT JS',
}

interface pageProps {
    params: {
        chatId: string
    }
}

const getChatMessages = async (chatId: string) => {
    try {
        const results: string[] = await fetchRedis('zrange', `chat:${chatId}:messages`, 0, -1)

        const dbMessages = results.map((message) => JSON.parse(message) as Message)

        const reversedDbMessage = dbMessages.reverse()

        const messages = messageArrayValidator.parse(reversedDbMessage)

        return messages
    } catch (error) {
        notFound()
    }

}

const page = async ({ params }: pageProps) => {
    const { chatId } = params
    const session = await getServerSession(authOptions)
    if (!session) notFound()

    const { user } = session

    const [userId1, userId2] = chatId.split('--')

    if (user.id !== userId1 && user.id !== userId2)
        notFound()

    const chatPartnerId = user.id === userId1 ? userId2 : userId1

    const chatPartnerRaw = (await fetchRedis(
        'get',
        `user:${chatPartnerId}`
    )) as string
    const chatPartner = JSON.parse(chatPartnerRaw) as User

    const initialMessages = await getChatMessages(chatId)
    return (
        <div className='flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]'>
            <div className='flex sm:items-center justify-between py-3 border-b-2 border-gray-200 dark:border-zinc-500'>
                <div className='relative flex items-center space-x-4'>
                    <div className='relative'>
                        <div className='relative h-8 sm:h-12 w-8 sm:w-12'>
                            <Image
                                fill
                                referrerPolicy='no-referrer'
                                src={chatPartner.image}
                                alt={`${chatPartner.name} profile picture`}
                                className='rounded-full'
                            />
                        </div>
                    </div>

                    <div className='flex flex-col leading-tight'>
                        <div className='text-xl flex items-center'>
                            <span className='text-gray-700 dark:text-gray-200 mr-3 font-semibold'>
                                {chatPartner.name}
                            </span>
                        </div>
                        <span className='text-sm text-gray-600 dark:text-zinc-400'>{chatPartner.email}</span>
                    </div>
                </div>
            </div>
            <Messages
                initialMessages={initialMessages}
                sessionId={session.user.id}
                sessionImg={session.user.image}
                chatPartner={chatPartner}
                chatId={chatId}
            />
            <ChatInput
                chatId={chatId}
                chatPartner={chatPartner}
            />
        </div>
    )
}

export default page