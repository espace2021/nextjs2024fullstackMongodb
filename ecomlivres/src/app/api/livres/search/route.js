import Livre from '@/models/Livre';
import  Specialite from '@/models/Specialite';

import {  NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
  
export async function GET(req) { console.log(req.query)
    try {
        await connectDB();
        let  query  = req.url;
  
    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' });
    }
  
    // Décoder les caractères spéciaux de l'URL
  query = decodeURIComponent(query);

  // Supprimer les espaces de la chaîne de requête
  query = query.replace(/\s+/g, '');

  // Extraire les mots clés de la chaîne de requête
    const searchQueries = query.split(',');
    
    try {
     // Recherche des spécialités correspondant aux searchQueries
    const specialites = await Specialite.find({ nomspecialite: { $in: searchQueries } }).exec();
    
    // Récupération des IDs des spécialités trouvées
    const specialiteIds = specialites.map(specialite => specialite._id);

    // Recherche des livres dont les spécialités correspondent aux IDs trouvés
    const livres = await Livre.find({ specialite: { $in: specialiteIds } }).exec();
    
      return NextResponse.json(livres);
      
    } catch (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json({ error: 'Internal Server Error' });
    }
    } catch (error) {
        return NextResponse.json({ error : error });
    }
}

