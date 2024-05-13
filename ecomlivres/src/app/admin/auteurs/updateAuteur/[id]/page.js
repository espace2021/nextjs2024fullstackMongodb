import {fetchAuteurById} from "@/services/auteurService"
import UpdateAuteur from '@/components/auteurComponents/updateAuteurComponent';



const getauteur=async(id)=>{
  const data=await fetchAuteurById(id)
  return data;
}

const AuteurUpdatePage = async({params}) => {

  const auteur = await getauteur(params.id)
  return (
    <div>
       <UpdateAuteur auteur={auteur}  />
    </div>
  )
}

export default AuteurUpdatePage
