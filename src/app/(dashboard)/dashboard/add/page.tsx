import AddFriendButton from '@/components/AddFriendButton'
import { Metadata } from 'next'
import { FC } from 'react'

export const metadata: Metadata = {
    title: 'Add Friend | Realtime Chat App',
    description: 'Created By Krushna_3 | NEXT JS',
}

const page: FC = () => {
    return (
        <main className='pt-8'>
            <h1 className='font-bold text-5xl mb-8 text-black dark:text-white'>Add a friend</h1>
            <AddFriendButton />
        </main>
    )
}

export default page