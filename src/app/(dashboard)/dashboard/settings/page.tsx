'use client'
import { ChevronDown, Monitor, Moon, Sun, SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { FC, useEffect, useState } from 'react'

interface pageProps { }


const page: FC<pageProps> = ({ }) => {
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState<string>('Light');

    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const handleMenu = () => {
        setOpen(!open)
    }

    const handleSelect = (menu: string) => {
        setActive(menu)
        setOpen(false)
        if (menu === 'Dark')
            setTheme("dark")
        if (menu === 'Light')
            setTheme("light")
    }

    const menus = ['Light', 'Dark', 'System default']
    return (
        <div className='container py-12'>
            <h1 className='font-bold text-5xl mb-8'>Settings</h1>

            <div className=' bg-zinc-100 border border-zinc-200 p-3 rounded-md flex items-center justify-between max-[480px]:flex-col group'>
                <div className='mb-4 flex-shrink-0 sm:mb-0 sm:mr-4'>
                    <div className='relative text-gray-700 hover:text-indigo-600 hover:bg-gray-50 flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
                        <div className='text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-light bg-white'>
                            <SunMoon className='h-5 w-5 font-mono' />
                        </div>
                        <div className='flex flex-col'>
                            <p className='truncate text-lg font font-semibold group-hover:text-indigo-600'>Theme</p>
                            <span className='text-zinc-400 text-xs font-light'>App color theme</span>
                        </div>
                    </div>
                </div>

                <div className='relative'>
                    <div
                        className='rounded-md h-8 flex items-center justify-between  bg-zinc-50 text-black cursor-pointer'
                        onClick={handleMenu}
                    >
                        <div className='flex items-center w-[9.5rem]'>
                            {active === 'Light' ? <Sun className='w-4 h-4 m-2' /> : active === 'Dark' ? <Moon className='w-4 h-4 m-2' /> : <Monitor className='w-4 h-4 m-2' />}
                            <span>{theme}</span>
                        </div>
                        <ChevronDown className='w-4 h-4 m-2 text-gray-600' />
                    </div>
                    {
                        open &&
                        <div className='bg-indigo-600 text-white rounded-md p-1 absolute -top-1 -left-1'>
                            <ul>
                                {
                                    menus.map((menu, index) => (
                                        <li
                                            key={index}
                                            className={`flex w-44 h-8 items-center m-0.5 rounded-md cursor-pointer hover:bg-indigo-500 ${active === menu ? 'bg-indigo-500' : ''}`}
                                            onClick={() => handleSelect(menu)}
                                            value={menu}
                                        >
                                            {active === menu ? <span className='h-6 w-1 bg-indigo-200 m-1 rounded-full'></span> : ''}
                                            {menu === 'Light' ? <Sun className='w-4 h-4 m-2' /> : menu === 'Dark' ? <Moon className='w-4 h-4 m-2' /> : <Monitor className='w-4 h-4 m-2' />}
                                            <span>{menu}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    }
                </div>

            </div>
        </div >
    )
}

export default page