'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
type AdminRoute ={
    link: {
        url: string;
        text: string;
        blank: boolean;
    }
}
const AdminRoute = ({link}:AdminRoute) => {
    const pathname=usePathname()
    const isActive=pathname.startsWith(link.url)
  return (
    <Link 
        target={link.blank? '_blank':''}
        href={link.url} 
        className={`${isActive ?'bg-amber-400':''} font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b`} 
    >
        {link.text}
    </Link>
  )
}

export default AdminRoute