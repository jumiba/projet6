/*Requete des modules et dossiers*/
const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

/*Export de la fonction d'inscription*/
exports.signup = (req, res) =>
{
    Bcrypt.hash(req.body.password, 10)
    .then(hash =>
    {
        const user = new User
        ({
          email: req.body.email,
          password: hash
        });
        user.save()
        .then(() => {return res.status(201).json({ message: 'Utilisateur créé' })})
        .catch(error => {return res.status(400).json({ error })});//ici erreur
    })
    .catch(error => {return res.status(500).json({ error })});
};

/*Export de la fonction d'identification*/
exports.login = (req, res) =>
{
    User.findOne({ email: req.body.email })
    .then(user =>
    {
        if (!user)
        {
            return res.status(401).json({ message: 'login ou mot de passe incorrecte'});
        }
        Bcrypt.compare(req.body.password, user.password)
        .then(valid =>
        {
            if (!valid)
            {
                return res.status(401).json({ message: 'login ou mot de passe incorrecte' });
            }
            res.status(200).json
            ({
                userId: user._id,
                token: jwt.sign
                (
                    { userId: user._id },
                    `${process.env.PASS}`,
                    { expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};