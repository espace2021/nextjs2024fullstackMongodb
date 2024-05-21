import { HttpStatusCode } from 'axios';
import Livre from '@/models/Livre';
import {  NextResponse } from 'next/server';

export async function GET(_, { params }) {
    try {
     
        const livre = await Livre.findById(params.id).populate('auteurs').populate('specialite').populate('maised')
        if (livre) {
            return NextResponse.json(livre);
        }
        return NextResponse.json({ message: `Livre ${params.id} not found` }, { status: HttpStatusCode.NotFound });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}

export async function PUT(req, { params }) {
    try {
       
        const body= await req.json();
        const livre = await Livre.findByIdAndUpdate(
            params.id,
            { $set: body },
          { new: true }
        );
            return NextResponse.json({ livre });
        } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}

export async function DELETE(_, { params }) {
    try {
            await Livre.findByIdAndDelete(params.id);
            return NextResponse.json({ message: `Book ${params.id} has been deleted` });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}
