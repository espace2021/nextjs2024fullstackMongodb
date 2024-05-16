import connectDB from '@/lib/connectDB';
import Editeur from '@/models/Editeur';
import {  NextResponse } from 'next/server';
import { HttpStatusCode } from 'axios';
  
export async function GET() {
    try {
        await connectDB();
        const editeurs = await Editeur.find({}, null, {sort: {'_id': -1}});
        return NextResponse.json(editeurs );
    } catch (error) {
        return NextResponse.json({ error });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        if (body.maisonedit) {
            const editeur = await Editeur.create(body);
            return NextResponse.json(
                { editeur, message: 'Your editor has been created' },
                { status: HttpStatusCode.Created },
            );
        }
        return NextResponse.json({ message: 'Editor name is missing' }, { status: HttpStatusCode.BadRequest });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}