/*Requete des modules et dossiers*/
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

/*Route post pour l'inscription et l'identification*/
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

/*Exportations*/
module.exports = router;