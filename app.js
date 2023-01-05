/*Requete des modules et dossiers*/
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');
require('dotenv').config();
app.use(express.json());

/*Banque de données reservez au projet (Etudiant, projet 6, cluster0) (mangodb)*/
mongoose.connect(process.env.MONGOPASS,
{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie'))
.catch(() => console.log('Connexion à MongoDB échouée'));

/*Autorisation setHeaders*/
app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/*Utilisation des fichiers*/
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

/*Exportations*/
module.exports = app;