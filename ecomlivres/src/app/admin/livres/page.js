import Listlivres from '@/components/livreComponents/listlivres';

import {fetchLivres} from "@/services/livreService"
const getLivres=async()=>{
const data=await fetchLivres()
return data;
}
const LivrePage = async() =>{
    const livres=await getLivres()
    
  return (
   <div>
      <Listlivres livres={livres}/>
    </div>
  )
}

export default LivrePage
