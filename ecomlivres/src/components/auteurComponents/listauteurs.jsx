"use client"
import  { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';

import Button from 'react-bootstrap/Button';
import {deleteAuteur} from "@/services/auteurService"
import { useRouter } from "next/navigation";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Link from 'next/link';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const Listauteurs = ({auteurs}) => {
  
  const router = useRouter();

    const deleteauteur=(id)=>{
      
      if(window.confirm("supprimer Auteur O/N")) {
        
        deleteAuteur(id)
        .then((res)=>{ console.log(res)
         router.refresh()
        })
        .catch(error=>{
            console.log(error)
           })
  }
  
        }
  

  const columns = useMemo(
    () => [
    {
    accessorKey: 'nomauteur', 
    header: 'NOM',
    size: 100,
    },
    {
    accessorKey: 'email',
    header: 'EMAIL',
    size: 100,
    },
    {
    accessorKey: 'numtel', 
    header: 'TEL',
    size: 100,
    },
    {
      accessorKey: '_id',
      header: 'actions',
      size: 100,
      Cell: ({ cell, row }) => (
      <div >
      <Button
       size="md"
       className="text-primary btn-link edit"
      >
        <Link href={`/admin/auteurs/updateAuteur/${cell.row.original._id}`}>
        <EditOutlinedIcon/>
    </Link>
     
      </Button>

      <Button
      onClick={(e) => {
      deleteauteur(cell.row.original._id,e);
      
      }}
      variant="danger"
      size="md"
      className="text-danger btn-link delete"
      >
      <DeleteForeverIcon />
      </Button>
      </div>
      ),
      },

    ],
    [auteurs],
    );
return (
<div>
<Button
variant='dark'
size="sm"
>

<Link
href="/admin/auteurs/newAuteur"
style={{
  textDecoration: 'none',
  color: 'aqua',
  fontSize: 14,
  
}}
>
<AddCircleOutlineIcon/> Nouveau
</Link>
</Button>

<MaterialReactTable columns={columns} data={auteurs} />
</div>

  )
}
export default Listauteurs
