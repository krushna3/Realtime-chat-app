import Button from '@/components/ui/Button'
import { FC } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Realtime-chat-app',
}

export interface PageProps {

}

const page: FC<PageProps> = ({ }) => {
    return (
        <Button variant={'default'}>Hello</Button>
    )
}

export default page