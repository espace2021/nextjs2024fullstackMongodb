import connectDB from '@/lib/connectDB';
import Specialite from '@/models/Specialite';
import {  NextResponse } from 'next/server';
import { HttpStatusCode } from 'axios';
 
export async function GET() {
    try {
        await connectDB();
        const specialites = await Specialite.find({}, null, {sort: {'_id': -1}});
        return NextResponse.json(specialites );
    } catch (error) {
        return NextResponse.json({ error });
    }
}

export async function POST(req) {
    try {
        
        const body = await req.json();
        const newSpecialite = new Specialite(body)
        const specialite = await newSpecialite.save();
        return NextResponse.json(
                { specialite, message: 'Your speciality has been created' },
                { status: HttpStatusCode.Created },
            );
    } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}