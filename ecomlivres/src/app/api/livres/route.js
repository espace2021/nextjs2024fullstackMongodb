import { HttpStatusCode } from 'axios';
import Livre from '@/models/Livre';
import {  NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
export async function POST(req) {
    try {
       
        const body = await req.json();
       
        const newLivre = new Livre(body)
        const livre = await newLivre.save();
       
            return NextResponse.json(
                { livre, message: 'Your book has been created' },
                { status: HttpStatusCode.Created },
            );
  } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}

  
export async function GET() {
    try {
        await connectDB();
        const livres = await Livre.find({}, null, {sort: {'_id': -1}}).populate('auteurs').populate('specialite').populate('maised')
        return NextResponse.json(livres );
    } catch (error) {
        return NextResponse.json({ error : error });
    }
}
