'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { addSpeciality} from '@/lib/actionsSpecialite'
import { useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from 'react-bootstrap/Modal';

export default function CreateForm() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [state, formAction] = useFormState(addSpeciality, {
    message: '',
  })

  const { pending } = useFormStatus()

  const ref = useRef()

  useEffect(() => {
   if (state.message){
    setShow(false)
      ref.current?.reset()
      toast(state.message)
    }
  }, [state.message])

  return (
    <div>
      <button
        className="btn btn-dark"
        onClick={handleShow}
        style={{
            textDecoration: 'none',
            color: 'aqua',
            fontSize: 14,
            
          }}
      >
        <AddCircleOutlineIcon/> Nouveau
      </button>

      <Modal show={show} onHide={handleClose}>
      <form ref={ref} action={formAction}>
        <Modal.Header closeButton>
          <Modal.Title>  <h2 className="tex-2xl font-bold pm-4">Ajout Spécialité</h2> </Modal.Title>
        </Modal.Header>

        <Modal.Body>
               
            <div className="form-control w-full max-w-xs py-4">
              <label htmlFor="nomspecialite">Nom</label>
              <input
                type="text"
                id="nomspecialite"
                name="nomspecialite"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </div>
                  
            </Modal.Body>

            <Modal.Footer>
            <button
              className="btn btn-primary mr-3"
              type="submit"
              disabled={pending}
            >
              Enregistrer
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleClose}
            >
              Back
            </button>
            </Modal.Footer>
            </form>
          </Modal>
      
    </div>
  )
}
