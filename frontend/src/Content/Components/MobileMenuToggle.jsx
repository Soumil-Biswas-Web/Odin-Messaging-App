import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import React from 'react'

export default function MobileMenuToggle({isOpen, onClick}) {
  return (
    <button
    className="right-4 items-center  md:hidden flex justify-end cursor-pointer text-2xl"
    onClick={onClick}
    >
    {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
    </button>
  )
}
