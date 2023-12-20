// import AddFriendButton from '@/components/AddFriendButton'
// import { Metadata } from 'next'
// import { FC } from 'react'

// export const metadata: Metadata = {
//     title: 'Add Friend | Realtime Chat App',
//     description: 'Created By Krushna_3 | NEXT JS',
// }

// const page: FC = () => {
//     return (
//         <main className='pt-8'>
//             <h1 className='font-bold text-5xl mb-8 text-black dark:text-white'>Add a friend</h1>
//             <AddFriendButton />
//         </main>
//     )
// }

// export default page

import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface loadingProps { }

const loading: FC<loadingProps> = ({ }) => {
    return (
        <div className='w-full flex flex-col gap-3  dark:bg-black'>
            <Skeleton className='mb-4' height={60} width={500} baseColor='#473F4E' highlightColor='#09090E' />
            <Skeleton height={20} width={150} />
            <Skeleton height={50} width={400} />
        </div>
    )
}

export default loading