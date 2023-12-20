import { SettingsIcon } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'



interface SettingsProps { }

const Settings: FC<SettingsProps> = async ({ }) => {
    return (
        <Link
            href='/dashboard/settings'
            className='text-gray-700 dark:text-[#A7A1AB] hover:text-indigo-600 dark:hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-[#09090E] group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
            <div className='text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white dark:bg-black dark:group-hover:bg-[#09090E]'>
                <SettingsIcon className='h-4 w-4' />
            </div>
            <p className='truncate'>Settings</p>
        </Link>
    )
}

export default Settings