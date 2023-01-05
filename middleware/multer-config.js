/*Module de téléchargement de fichiers*/
const multer = require('multer');

/*Dictionnaire de types d'extensions des fichiers images téléchargeable*/
const ExtType =
{
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

/*Configuration de la zone de stockage*/ 
const storage = multer.diskStorage
({
    /*Destination des fichiers*/
    destination:(req, file, callback) =>
    {
        callback(null, 'images');
    },
    /*Noms des fichiers*/
    filename: (req, file, callback) =>
    {
        const nom = file.originalname.split(' ').join('_');
        const extension = ExtType[file.mimetype];
        callback(null, nom + Date.now() + '.' + extension);
    }
});

/*Exportations*/
module.exports = multer({storage: storage}).single('image');