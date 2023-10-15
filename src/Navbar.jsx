import { Moon, Sun } from 'lucide-react'
import React, { useState } from 'react'


const Navbar = ({theme, handleSwitchTheme}) => {
  return (
    <header className='sticky top-0 bg-white dark:bg-[#2b3945] z-20 w-full bg-[hsl(0, 0%, 30%)] shadow-md h-[80px]'>
        <nav className='w-[1000px] max-w-[90%] h-[80px] mx-auto flex justify-between items-center'>
            <h1 className='text-xl dark:text-white font-bold'>Where in the world?</h1>

            <button onClick={handleSwitchTheme} className='flex items-center gap-2 dark:text-white text-sm font-medium'>
                {theme === 'light' ? <Moon size={25} strokeWidth={1} strokeOpacity={0.9} /> : <Sun size={25} strokeWidth={1} strokeOpacity={0.9} />}
            </button>
        </nav>
    </header>
  )
}

export default Navbar
