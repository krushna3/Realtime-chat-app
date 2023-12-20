import { Icon, Icons } from '@/components/Icons'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { FC, ReactNode } from 'react'
import Image from 'next/image'
import SignOutButton from '@/components/SignOutButton'
import FriendRequestsSidebarOptions from '@/components/FriendRequestsSidebarOptions'
import { fetchRedis } from '@/helpers/redis'
import { getFriendsByUserId } from '@/helpers/get-friends-by-user-id'
import SidebarChatList from '@/components/SidebarChatList'
import MobileChatLayout from '@/components/MobileChatLayout'
import { Metadata } from 'next'
import Settings from '@/components/Settings'

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Created By Krushna_3 | NEXT JS',
}


interface LayoutProps {
    children: ReactNode
}

interface SidebarOptions {
    id: number
    name: string
    href: string
    Icon: Icon
}

const sidebarOptions: SidebarOptions[] = [
    {
        id: 1,
        name: 'Add Friend',
        href: '/dashboard/add',
        Icon: 'UserPlus'
    }
]

const Layout = async ({ children }: LayoutProps) => {

    const session = await getServerSession(authOptions)
    if (!session) notFound()

    const friends = await getFriendsByUserId(session.user.id)

    const unseenRequestCount = (
        await fetchRedis(
            'smembers', `user:${session.user.id}:incoming_friend_requests`
        ) as User[]
    ).length

    return (
        <div className='w-full flex h-screen bg-white dark:bg-black'>
            <div className='md:hidden'>
                <MobileChatLayout
                    friends={friends}
                    session={session}
                    sidebarOptions={sidebarOptions}
                    unseenRequestCount={unseenRequestCount}
                />
            </div>
            <div className='hidden md:flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-6 bg-white dark:bg-black'>
                <Link href='/dashboard' className='flex h-16 shrink-0 items-center'>
                    {/* <Icons.Logo className='h-8 w-auto text-indigo-600' /> */}
                    <div className='flex gap-1 items-end'>
                        <img src="/Images/Logo.png" alt="Dashboard" className='h-10 w-10' />
                        <span className='text-base font-semibold hover:text-slate-400 dark:hover:text-gray-700 text-black dark:text-white'>Chatyl</span>
                    </div>
                </Link>

                {friends.length > 0 ? (
                    <div className='text-xs font-semibold leading-6 text-gray-400 dark:text-gray-700'>
                        Your chats
                    </div>) : null}

                <nav className='flex flex-1 flex-col'>
                    <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                        <li>
                            <SidebarChatList sessionId={session.user.id} friends={friends} />
                        </li>
                        <li>
                            <div className='text-xs font-semibold leading-6 text-gray-400 dark:text-gray-700'>Overview</div>

                            <ul role='list' className='-m-2 mt-2 space-y-1'>
                                {
                                    sidebarOptions.map((option) => {
                                        const Icon = Icons[option.Icon]
                                        return (
                                            <li key={option.id}>
                                                <Link
                                                    href={option.href}
                                                    className='text-gray-700 dark:text-[#A7A1AB] hover:text-indigo-600 dark:hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-[#09090E] group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                >
                                                    <span className='text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white dark:bg-black dark:group-hover:bg-[#09090E]'>
                                                        <Icon className='h-4 w-4' />
                                                    </span>

                                                    <span className='truncate'>{option.name}</span>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                                <li>
                                    <FriendRequestsSidebarOptions
                                        sessionId={session.user.id}
                                        initialUnseenRequestCount={unseenRequestCount}
                                    />
                                </li>
                                <li>
                                    <Settings />
                                </li>
                            </ul>
                        </li>


                        <li className='-mx-6 mt-auto flex items-center'>
                            <div className='flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200'>
                                <div className='relative h-8 w-8 bg-gray-50 dark:bg-black'>
                                    <Image
                                        fill
                                        referrerPolicy='no-referrer'
                                        className='rounded-full'
                                        src={session.user.image || ''}
                                        alt='Your Profile Picture'
                                    />
                                </div>

                                <span className='sr-only'>Your Profile</span>
                                <div className='flex flex-col'>
                                    <span aria-hidden='true'>{session.user.name}</span>
                                    <span className='text-xs text-zinc-400 dark:text-gray-700' aria-hidden='true'>{session.user.email}</span>
                                </div>
                            </div>

                            <SignOutButton className='h-full aspect-square' />
                        </li>
                    </ul>
                </nav>
            </div>
            <aside className='max-h-screen container py-16 md:py-12 w-full'>
                {children}
            </aside>
        </div>
    )
}

export default Layout;