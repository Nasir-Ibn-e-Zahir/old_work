import Header from '@/components/dashboard/header/Header'
import Sidebar from '@/components/dashboard/sidebar/sidebar'

import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import  { ReactNode } from 'react'

const AdminDashboardlayout = async ({children}:{children:ReactNode}) => {

  const user = await currentUser()
    console.log(user?.privateMetadata.role)
    if(user?.privateMetadata.role != "ADMIN") redirect("/")
      
  return (
    <div className='w-full h-full'>
     <Sidebar  isAdmin={true}/>
       <div className="w-full ml-[300px] ">
           <Header/>
           <div className="w-full mt-[74] p-4">{children}</div>
       </div>
    </div>
  )
}

export default AdminDashboardlayout
