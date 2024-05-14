import mongoose from "mongoose"
var editeurSchema = mongoose.Schema({
    maisonedit: String,
    siteweb: String,
    email: String
})
const Editeur = mongoose.models.Editeur ||mongoose.model('Editeur', editeurSchema);
export default Editeur
