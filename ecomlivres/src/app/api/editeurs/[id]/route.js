import { HttpStatusCode } from 'axios';
import Editeur from '@/models/Editeur';
import {  NextResponse } from 'next/server';

export async function GET(_, { params }) {
    try {
       
        const editeur = await Editeur.findById(params.id);
        if (editeur) {
            return NextResponse.json(editeur);
        }
        return NextResponse.json({ message: `Editor ${params.id} not found` }, { status: HttpStatusCode.NotFound });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}

export async function PUT(req, { params }) {
    try {
        
        const body= await req.json();
        const editeur = await Editeur.findByIdAndUpdate(
            params.id,
            { $set: body },
          { new: true }
        );
            return NextResponse.json({ editeur });
         } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}

export async function DELETE(_, { params }) {
    try {
        await Editeur.findByIdAndDelete(params.id);
        return NextResponse.json({ message: `Editor ${params.id} has been deleted` });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}