/*Requete des modules et dossiers*/
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/*Modele (Shema) du Data enregistrer dans la Database de mangoDB*/
const userSchema = mongoose.Schema
({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
userSchema.plugin(uniqueValidator);

/*Exportations*/
module.exports = mongoose.model('User', userSchema);