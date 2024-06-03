'use client'
import React from 'react'
import { MaterialReactTable} from 'material-react-table';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import DeleteForm from './suppSpecialite';

import UpdateSpecialiteComponent from './updateSpecialiteComponent'
import { fetchOneSpecialite } from '@/lib/actionsSpecialite'
import { useFormStatus } from 'react-dom'

const ListSpecialites = ({specialites}) => {

    const [isEdit,setIsEdit]=React.useState(false)
    const [specialite, setSpecialite]=React.useState("")
  
    const { pending } = useFormStatus()

    const columns = React.useMemo(
        () => [
          {
            accessorKey: 'nomspecialite', 
            header: 'Name',
            size: 150,
          },
          {
            accessorKey: '_id',
            header: 'Actions',
            size: 100,
            Cell: ({ cell, row }) => (
                <div >
                
                <form
                action={async () => {
                    const res = await fetchOneSpecialite(cell.row.original._id)
                    setSpecialite(res)
                    setIsEdit(true)
                }}
                >
                <button type="submit" disabled={pending} className="btn btn-ghost text-success">
                    <EditOutlinedIcon/>
                </button>
                </form>  

                   <DeleteForm
                    _id={cell.row.original._id}
                    nomspecialite={cell.row.original.nomspecialite}
                  />

                </div>
            ),
        },
          ],
        [],
      );

  return (
    <>
    <MaterialReactTable columns={columns} data={specialites} />
    {isEdit ? <UpdateSpecialiteComponent specialite={specialite} />
    :null}
    </>
 )
}

export default ListSpecialites
