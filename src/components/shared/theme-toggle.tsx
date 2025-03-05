"use client";

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'

const ThemeToggle = () => {
    const {setTheme} = useTheme()

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild> 
            <Button variant={'outline'} size={'icon'} className='w-10 h-10 rounded-full' >
            <SunIcon className='w-[1.4rem] h-[1.4rem] rotate-0 scale-100  transition-all dark:-rotate-90 dark:scale-0'  />
            <MoonIcon className='absolute w-[1.4rem] h-[1.4rem] rotate-90 scale-0  transition-all dark:rotate-0 dark:scale-100'  />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Modes</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem onClick={()=>setTheme('light')} >Light</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setTheme('dark')} >Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setTheme('system')} >system</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToggle
