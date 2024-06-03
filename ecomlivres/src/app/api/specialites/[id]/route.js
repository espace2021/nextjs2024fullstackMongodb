import { HttpStatusCode } from 'axios';
import Specialite from '@/models/Specialite';
import {  NextResponse } from 'next/server';

export async function GET(_, { params }) {
    try {
       
        const specialite = await Specialite.findById(params.id);
        if (specialite) {
            return NextResponse.json(specialite);
        }
        return NextResponse.json({ message: `Speciality ${params.id} not found` }, { status: HttpStatusCode.NotFound });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}

export async function PUT(req, { params }) {
    try {
        
        const body= await req.json();
        const specialite = await Specialite.findByIdAndUpdate(
            params.id,
            { $set: body },
          { new: true }
        );
            return NextResponse.json({ specialite });
         } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}

export async function DELETE(_, { params }) {
    try {
        await Specialite.findByIdAndDelete(params.id);
        return NextResponse.json({ message: `Speciality ${params.id} has been deleted` });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}