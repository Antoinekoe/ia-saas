import { useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, FileText, Hash, House, Icon, Images, Scissors, SquarePen, Users } from 'lucide-react';
import React from 'react'
import { NavLink } from 'react-router-dom';

const navItems = [
    {to: "/ai", label: "Dashboard", Icon: House},
    {to: "/ai/write-article", label: "Write article", Icon: SquarePen},
    {to: "/ai/blog-titles", label: "Blog titles", Icon: Hash},
    {to: "/ai/generate-images", label: "Generate images", Icon: Images},
    {to: "/ai/remove-background", label: "Remove background", Icon: Eraser},
    {to: "/ai/remove-object", label: "Remove object", Icon: Scissors},
    {to: "/ai/review-resume", label: "Review resume", Icon: FileText},
    {to: "/ai/community", label: "Community", Icon: Users},
]

const Sidebar = ({sidebar, setSideBar}) => {

    const {user} = useUser();
    const {signOut, openUserProfile} = useClerk();
  return (
    <div className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-f-xull'} transition-all duration-300 ease-in-out`}>
        <div className="my-7 w-full">
            <img src={user.imageUrl} className="w-13 rounded-full mx-auto" alt="User avatar" />
            <h1 className="mt-1 text-center">{user.fullName}</h1>
        
        <div className="px-6 mt-5 text-sm text-gray-600 font-medium">
            {navItems.map(({to, label, Icon}) => (
                <NavLink key={to} to={to} end={to === "/ai"} onClick={()=> setSideBar(false)} className={({isActive})=> `px-3.5 py-2.5 flex items-center gap-3 rounded ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : ''}`}>
                    {({isActive}) =>(
                        <>
                        <Icon className={`w-4 h-4 ${isActive ? "text-white " : ""}`}/>
                        {label}
                        </>
                    )}
                </NavLink>
            ))}
        </div>
        </div>
    </div>
  )
}

export default Sidebar