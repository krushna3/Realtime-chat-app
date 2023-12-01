import db from "@/lib/db"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Realtime-chat-app',
}

export default async function Home() {
  await db.set('hello', 'hello');
  return (
    <div className='text-red-500'>
      HelloWorld
    </div>
  )
}
