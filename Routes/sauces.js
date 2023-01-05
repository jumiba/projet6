/*Requete des modules et dossiers*/
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); 
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauces');

/*Routers*/
router.get('/', auth, saucesCtrl.allSauces);
router.get('/:id', auth, saucesCtrl.recupidSauces);
router.post('/', auth, multer, saucesCtrl.createSauces);
router.put('/:id', auth, multer, saucesCtrl.modifyidSauces);
router.delete('/:id', auth, saucesCtrl.SuppidSauces);
router.post('/:id/like', auth, saucesCtrl.likeidSauces);

/*Exportations*/
module.exports = router;