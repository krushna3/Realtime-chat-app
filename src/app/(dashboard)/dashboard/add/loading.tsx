import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface loadingProps { }

const loading: FC<loadingProps> = ({ }) => {
    return (
        <div className='w-full flex flex-col gap-3  dark:bg-black'>
            <Skeleton className='mb-4' height={60} width={500} baseColor='#a1a1aa' highlightColor='#c7d2fe' />
            <Skeleton height={20} width={150} baseColor='#a1a1aa' highlightColor='#c7d2fe' />
            <Skeleton height={50} width={400} baseColor='#a1a1aa' highlightColor='#c7d2fe' />
        </div>
    )
}

export default loading