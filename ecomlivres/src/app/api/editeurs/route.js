import connectDB from '@/lib/connectDB';
import Editeur from '@/models/Editeur';
import {  NextResponse } from 'next/server';
  
export async function GET() {
    try {
        await connectDB();
        const editeurs = await Editeur.find({}, null, {sort: {'_id': -1}});
        return NextResponse.json(editeurs );
    } catch (error) {
        return NextResponse.json({ error });
    }
}

