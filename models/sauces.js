/*Requete des modules et dossiers*/
const mongoose = require('mongoose');

/*Schemas des elements a apporter*/
const ModelsSauceSchema = mongoose.Schema
({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String},
    heat: {type: Number, required: true},
    likes:{type: Number, required: true, default:0},
    dislikes: {type: Number, required: true, default:0},
    usersLiked: {type: []},
    usersDisliked : {type: []}
});

/*Exportations*/
module.exports = mongoose.model('sauce', ModelsSauceSchema);