'use server'
import { revalidatePath } from 'next/cache'
import {addSpecialite,deleteSpecialite,fetchSpecialiteById,editSpecialite} from '@/services/specialiteService'

export async function addSpeciality(prevState, formData) { 
    const nomspecialite= formData.get('nomspecialite')
    
    const specialite ={
        nomspecialite
    }

    try {
        const result = await addSpecialite(specialite);
        revalidatePath('/admin/specialites')
       if(result.specialite.nomspecialite) return { message: `Created speciality ${result.specialite.nomspecialite}` }
       else  return { message: 'Failed to create speciality' }
    } catch (e) {
  return { message: 'Error : Failed to create speciality' }
}
}

export async function delSpecialite(_id,nomspecialite){
    try {
        const result = await deleteSpecialite(_id)
        console.log(result)
         revalidatePath('/admin/specialites')
      return { message: `Deleted speciality ${nomspecialite}` }
    } catch (e) {
      return { message: 'Failed to delete speciality' }
    }
  }

  export async function fetchOneSpecialite(_id) {
    try {
        const result = await fetchSpecialiteById(_id)
        return result 
    } catch (e) {
      return  null 
    }
  }
  

  export async function updateSpecialite(prevState, formData) {
    const _id= formData.get('_id')
    const nomspecialite= formData.get('nomspecialite')
   
    const specialite ={
        _id,
        nomspecialite
    }

    try {
        const result = await editSpecialite(specialite)
        revalidatePath('/admin/specialites')
       if(result.specialite.nomspecialite) return { message: `Updated Speciality ${result.specialite.nomspecialite}` }
       else  return { message: 'Failed to update Speciality' }
    } catch (e) {
  return { message: 'Failed to update Speciality' }
}
}
