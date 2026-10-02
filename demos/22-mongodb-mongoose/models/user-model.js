/**
 * Model de Mongoose permet d'avoir une structure de base des futures collections à manipuler
 */
import { model, Schema } from 'mongoose'

// Ici l'insertion d'un document doit obligatoire fournir ici firstname et lastname, le reste est facultatif
const userSchema = Schema({
    firstname: { type: String, required: true }, // required = info obligatoire
    lastname: { type: String, required: true },
    size: { type : Number },
    secu: { type: Number, unique: true },
    isAdmin: { type: Boolean },
    birth : { type: Date},
    pseudo : { type: String, required: true } 
})

export default model('User', userSchema)