import { Brush, ChevronRight } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { FC } from 'react'

export const metadata: Metadata = {
    title: 'Settings | Realtime Chat App',
    description: 'Created By Krushna_3 | NEXT JS',
}

interface pageProps { }

const page: FC<pageProps> = async ({ }) => {
    return (
        <div className='container py-12'>
            <h1 className='font-bold text-5xl mb-8'>Settings</h1>

            <div
                className='relative bg-zinc-50 border border-zinc-200 p-3 rounded-md'>
                <div className='absolute right-4 inset-y-0 flex items-center'>
                    <ChevronRight className='h-7 w-7 text-zinc-400' />
                </div>

                <div className='mb-4 flex-shrink-0 sm:mb-0 sm:mr-4'>
                    <div className='relative text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
                        <div className='text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-light bg-white'>
                            <Brush className='h-5 w-5' />
                        </div>
                        <div className='flex flex-col'>
                            <p className='truncate text-lg font font-semibold'>Theme</p>
                            <span className='text-zinc-400 text-xs font-light'>App color theme</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default page