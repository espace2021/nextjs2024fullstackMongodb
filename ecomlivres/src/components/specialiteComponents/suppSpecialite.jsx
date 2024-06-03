'use client'

import { delSpecialite} from '@/lib/actionsSpecialite'
import { useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function DeleteForm({ _id,nomspecialite}) {
  const { pending } = useFormStatus()
  return (
    <form
      action={async () => {
        const res = await delSpecialite(_id,nomspecialite)
        toast(res.message)
      }}
    >
      <button type="submit" disabled={pending} className="btn btn-ghost text-warning">
      <DeleteForeverIcon />
      </button>
    </form>
  )
}
