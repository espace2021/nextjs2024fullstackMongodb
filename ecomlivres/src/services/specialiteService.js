const SPECIALITE_API="/specialites/"

export const fetchSpecialites=async()=> { 
const res = await fetch(process.env.NEXT_PUBLIC_API_URL+SPECIALITE_API, { cache: 'no-store' })
const response = await res.json();
return response;
}

export const fetchSpecialiteById=async(specialiteId)=> {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+SPECIALITE_API+`${specialiteId}`, { cache: 'no-store' },{
        method: 'GET'
    });
    const response = await res.json();
     return response;
}

export const deleteSpecialite=async(specialiteId) =>{ 
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+SPECIALITE_API+`${specialiteId}`,{
        method: 'DELETE'
    });
    const response = await res.json();
    return response;

}

export const addSpecialite=async(specialite)=> { 
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+SPECIALITE_API, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(specialite),
    });
    const response = await res.json();
     return response;
}

export const editSpecialite=async(specialite) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+SPECIALITE_API+`${specialite._id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(specialite),
    });
    const response = await res.json();
    return response;
}
