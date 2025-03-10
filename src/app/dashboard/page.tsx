import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'


export default async function DashbaordPage(){

   const user = await currentUser()
   console.log(user?.privateMetadata)

   if(user?.privateMetadata.role === "USER") redirect("/") 
   if(user?.privateMetadata.role === "ADMIN") redirect("/dashboard/admin")
   if(user?.privateMetadata.role === "SELLER") redirect("/dashboard/seller")
    redirect("/")

  
}


