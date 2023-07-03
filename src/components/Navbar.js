import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

const Navbar = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    handleScroll()
  })
  return (
    <div className="py-2 shadow-sm flex z-20 px-24 items-center justify-between bg-transparent backdrop-blur-sm w-full fixed">
      <h1 className='font-semibold text-2xl w-full'>LOGO</h1>
      <div className="flex items-center justify-center gap-6 text-sm font-semibold w-full [&_a:hover]:text-slate-400 [&_a]:transition-colors [&_a]:duration-200">
        <a className='hidden sm:block' href="/">Home</a>
        <a className='hidden xl:block' href="/news">News</a>
        <a className='hidden sm:block' href="/about">About Us</a>
        <a className='hidden sm:block' href="/contact">Contact Us</a>
      </div>

      <div className="w-full flex items-center justify-end gap-4">
        <Menu>
          <MenuButton>
            <Avatar name='Dan Abrahmov' size="md" src='https://bit.ly/dan-abramov' />
          </MenuButton>
          <MenuList css={{ paddingLeft: "12px", paddingRight: "12px", paddingTop: "16px", paddingBottom: "16px" }}>
            <MenuItem>Details</MenuItem>
            <MenuItem>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  )
}

export default Navbar