import { HttpStatusCode } from 'axios';
import Auteur from '@/models/Auteur';
import {  NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';

export async function POST(req) {
    try {
       
        const body = await req.json();
        const newAuteur = new Auteur(body)
        const auteur = await newAuteur.save();
        return NextResponse.json(
                { auteur, message: 'Your author has been created' },
                { status: HttpStatusCode.Created },
            );
       
    } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}

export async function GET() {
    try {
        await connectDB();
        const auteurs = await Auteur.find({}, null, {sort: {'_id': -1}});
        return NextResponse.json(auteurs );
    } catch (error) {
        return NextResponse.json({ error });
    }
}

