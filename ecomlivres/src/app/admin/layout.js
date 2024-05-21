import SideBar from "@/components/adminComponents/sideBar";
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function AdminLayout({ children }) {

const session = await getServerSession(authOptions)
 
  if (!session) {
    return (
      <section className='py-24'>
        <div className='container'>
          <h1 className='text-2xl font-bold'>
            You are not authorized to view this page
          </h1>
        </div>
      </section>
    )
  }

  return (
    <div className="row mt-4">
    <div className="col-md-2">
    <SideBar />
    </div>
    <div className="col-md-10">
    {children}
    </div>
    </div>
    
  )
}
