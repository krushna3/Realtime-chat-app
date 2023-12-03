import Button from '@/components/ui/Button'
import { FC } from 'react'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { json } from 'stream/consumers'

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Realtime-chat-app',
}

export interface PageProps {

}

const page: FC<PageProps> = async ({ }) => {
    const session = await getServerSession(authOptions);
    return (
        <>
            <pre>{JSON.stringify(session)}</pre>
            <Button variant={'default'}>Hello</Button>
        </>
    )
}

export default page