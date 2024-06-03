import ListSpecialites from "@/components/specialiteComponents/listSpecialites"
import {fetchSpecialites} from "@/services/specialiteService";

import { Toaster } from 'react-hot-toast'
import CreateForm from '@/components/specialiteComponents/newSpecialiteComponent'

async function getData() {
    const data=await fetchSpecialites()
    return data;
  }
   
  export default async function Page() {
    const data = await getData()
   return (
    <div>
    <Toaster />
    <CreateForm /> 

    <ListSpecialites specialites={data} />
    </div>
   );
  }
