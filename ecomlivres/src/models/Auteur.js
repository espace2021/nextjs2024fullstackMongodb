import mongoose from "mongoose"
var auteurSchema = mongoose.Schema({
    nomauteur: String,
    email: String,
    numtel: String
},
    {
        timestamps: true
    }
);
const Auteur = mongoose.models.Auteur || mongoose.model('Auteur', auteurSchema);
//ce sont les auteurs du modèle Mongo s'ils existent ou un modèle mongoose
//le schéma auteur est déjà là donc il y a une vérification s'il existe déjà il ne faut pas essayer de le créer
//pour éviter l'erreur OverwriteModelError: Cannot overwrite `Auteur` model once compiled.
export default Auteur
