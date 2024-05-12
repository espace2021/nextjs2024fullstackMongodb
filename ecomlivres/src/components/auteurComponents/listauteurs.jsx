"use client"
import  { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';

const Listauteurs = ({auteurs}) => {
  
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
    }
    ],
    [auteurs],
    );
return (
<div>
<MaterialReactTable columns={columns} data={auteurs} />
</div>

  )
}
export default Listauteurs
