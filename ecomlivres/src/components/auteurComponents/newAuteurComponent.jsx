"use client"
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useRouter } from "next/navigation";
import { addAuteur } from '@/services/auteurService';

const NewAuteur = () => {
  const router = useRouter();
  const [nomauteur, setNomauteur] = useState("");
const [email, setEmail] = useState("");
const [numtel, setNumtel] = useState("");

const [validated, setValidated] = useState(false);

const handleSubmit = (e) => {
e.preventDefault();
const form = e.currentTarget;
if (form.checkValidity() === true) {

const newAuteur = {
    nomauteur,
    email,
    numtel
};
//faire le add dans la BD
addAuteur(newAuteur)
.then(res => {
  router.push('/admin/auteurs')
    router.refresh()

})
.catch(error=>{

alert("Erreur ! Insertion non effectuée")
})
}
setValidated(true);
}

const handleReset = () => {
    setNomauteur("")
    setEmail("")
    setNumtel("")
}

return (
<div>

 <Form noValidate validated={validated} onSubmit={handleSubmit}>

 <h2>Ajout Auteur</h2>

<div className="container w-100 d-flex justify-content-center">
<div>
<div className='form mt-3'>
<Row className="mb-2">
<Form.Group as={Col} md="8" >
<Form.Label >Nom Auteur *</Form.Label>
<Form.Control
required
type="text"
placeholder="Nom Auteur"
value={nomauteur}
onChange={(e)=>setNomauteur(e.target.value)}
/>
<Form.Control.Feedback type="invalid">
Saisir Nom Auteur
</Form.Control.Feedback>
</Form.Group>
<Form.Group as={Col} md="8">
<Form.Label>Email *</Form.Label>
<Form.Control
required
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>
<Form.Control.Feedback type="invalid">

Saisir Email
</Form.Control.Feedback>
</Form.Group>
</Row>
<Row className="mb-2">
<Form.Group className="col-md-8">
<Form.Label>Téléphone *</Form.Label>
<InputGroup hasValidation>
<Form.Control
type="number"
required
placeholder="Téléphone"
value={numtel}
onChange={(e)=>setNumtel(e.target.value)}
/>
<Form.Control.Feedback type="invalid">
Téléphone Incorrecte
</Form.Control.Feedback>
</InputGroup>
</Form.Group>
</Row>
</div>
</div>
</div>
<center>
<Button type="submit">Enregistrer</Button>
<Button type="button" className="btn btn-warning"
onClick={()=>handleReset()}>Annuler</Button>
</center>
</Form>

</div>
);
};
export default NewAuteur
