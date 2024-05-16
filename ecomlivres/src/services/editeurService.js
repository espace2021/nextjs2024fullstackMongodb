const EDITEUR_API="/editeurs/"

export const fetchEditeurs=async()=> { 
const res = await fetch(process.env.NEXT_PUBLIC_API_URL+EDITEUR_API, { cache: 'no-store' })
const response = await res.json();
return response;
}

export const fetchEditeurById=async(editeurId)=> {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+EDITEUR_API+`${editeurId}`, { cache: 'no-store' },{
        method: 'GET'
    });
    const response = await res.json();
     return response;
}

export const deleteEditeur=async(editeurId) =>{ 
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+EDITEUR_API+`${editeurId}`,{
        method: 'DELETE'
    });
    const response = await res.json();
    return response;

}

export const addEditeur=async(editeur)=> {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+EDITEUR_API, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(editeur),
    });
    const response = await res.json();
    return response;
}

export const editEditeur=async(editeur) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+EDITEUR_API+`${editeur._id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(editeur),
    });
    const response = await res.json();
    return response;
}
