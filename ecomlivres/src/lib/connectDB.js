/*
// Importation de la bibliothèque mongoose pour l'interaction avec MongoDB
import mongoose from "mongoose";

// Récupération de l'URL de la base de données à partir des variables d'environnement
const DATABASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

// Vérification si l'URL de la base de données est définie
if (!DATABASE_URL) {
  throw new Error("Veuillez définir la variable d'environnement DATABASE_URL");
}

// Mise en cache de l'instance mongoose au niveau global
let cached = global.mongoose;



//Le fait d'utiliser le cache (cached) permet d'éviter de répéter 
//la création de nouvelles instances de connexion à la base de données 
//à chaque fois que la fonction connectDB() est appelée.


// Si l'instance mongoose n'est pas mise en cache, initialisation
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Fonction asynchrone pour se connecter à la base de données
async function connectDB() {
  // Si la connexion est déjà établie, retourner la connexion mise en cache
  if (cached.conn) {
    return cached.conn;
  }

  // Si la connexion n'est pas encore établie, initialisation


//cached.promise est une propriété utilisée pour stocker une promesse (Promise) qui représente l'état 
//de la connexion à la base de données. Cette promesse est utilisée pour garantir que la connexion n'est établie qu'une seule fois, même si la fonction connectDB() est appelée 
//simultanément à partir de plusieurs endroits dans le code.

 

  if (!cached.promise) {
    // Options de connexion à MongoDB
    const opts = {
      bufferCommands: false,
    };

    // Établissement de la connexion à MongoDB en utilisant mongoose
    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }
  // Attendre que la promesse de connexion se résolve et mettre en cache la connexion
  cached.conn = await cached.promise;
  return cached.conn;
}

// Exportation de la fonction pour se connecter à la base de données
export default connectDB;
*/

/*
Lorsque la fonction connectDB() est appelée pour la première fois, cached.promise est null.
La première fois que la fonction est appelée, elle initialise une nouvelle promesse pour établir la connexion à la base de données 
en utilisant mongoose.connect(). Cette promesse est stockée dans cached.promise.
Les appels suivants à la fonction connectDB() qui se produisent pendant que la promesse est 
en cours d'exécution n'entrent pas dans la section de création de promesse. Au lieu de cela, 
ils attendent simplement que la promesse existante se résolve ou se rejette.
Une fois que la promesse est résolue (c'est-à-dire que la connexion à la base de données est établie 
avec succès), la connexion est mise en cache dans cached.conn, et cette connexion est renvoyée pour tous 
les appels futurs à connectDB(). Cela garantit que la connexion 
n'est établie qu'une seule fois, même si la fonction est appelée à plusieurs reprises.
*/


import mongoose from "mongoose";
const DATABASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;
const connectDB=async()=> {
try{
await mongoose.connect(DATABASE_URL);
console.log("connexion a la base de donnée réussie")
}catch(error){
    throw new Error("erreur de connexion a la base de données")
}
}
export default connectDB;
