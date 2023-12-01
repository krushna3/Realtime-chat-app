'use client'
import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <div>
            <Toaster position='top-center' reverseOrder={false} />
            {children}
        </div>
    )
}

export default Providers