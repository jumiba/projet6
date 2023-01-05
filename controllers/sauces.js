/*récupération du model de sauces et du module FileSystem*/
const Sauces = require('../models/sauces');
const fs = require('fs');

/*récupération de toutes les sauces*/
exports.allSauces = (req, res) => 
{
    Sauces.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({error}))
};

/*créer une sauce*/
exports.createSauces = (req, res) =>
{
    const sauceObjet = JSON.parse(req.body.sauce);
    delete sauceObjet._userId;
    const sauceModel = new Sauces
    ({
        ...sauceObjet,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauceModel.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
};

/*récupération d'une seule sauce*/
exports.recupidSauces = (req, res) =>
{
    Sauces.findOne({_id: req.params.id})
    .then(sauce => res.status(201).json(sauce))
    .catch(error => res.status(400).json({ error }));
};

/*Modifier une sauce*/
exports.modifyidSauces = (req, res) =>
{
    const sauceModif = req.file ? 
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : 
    { ...req.body };
    delete sauceModif.userId;

    Sauces.findOne({_id: req.params.id})
    .then(sauce =>
    {
        /*si ce n'est pas l'utilisateur qui l'a créer, on l'interdit de modifier*/
        if(sauce.userId != req.auth.userId)
        {
            res.status(403).json({message: '403 Not authorized'});
        }
        /*sinon on modifie*/
        else
        {
            Sauces.updateOne({ _id: req.params.id }, { ...sauceModif, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet modifié !'}))
            .catch(error => res.status(400).json({ error }));
        }
    })
    .catch(error => res.status(400).json({ error }))
};

/*Supprimer une sauce*/
exports.SuppidSauces = (req, res) =>
{
    Sauces.findOne({ _id: req.params.id})
    .then(sauce =>
    {
        /*si ce n'est pas l'utilisateur qui l'a créer, on l'interdit de supprimer*/
        if(sauce.userId != req.auth.userId)
        {
            res.status(403).json({message: '403 Not authorized'});
        }
        /*sinon on supprime, y compris l'image dans le dossier image*/
        else
        {
            const fichier = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${fichier}`, () =>
            {
                sauce.deleteOne({_id: req.params.id})
                .then(() => { res.status(200).json({message: 'Objet supprimé'})})
                .catch(error => res.status(400).json({error}));
            });
        }
    })
    .catch(error => {res.status(500).json({error});});
};

/*Liker une sauce*/
exports.likeidSauces = (req, res) =>
{
    /*Si l'utilisateur like*/
    if (req.body.like === 1)
    {
        Sauces.updateOne({ _id: req.params.id }, {$inc : {likes: 1}, $push : {usersLiked: req.body.userId}})
        .then(() => {return res.status(200).json({message : 'Like ajouté'})})
        .catch(error => res.status(400).json({ error }));
    }
    /*Si l'utilisateur dislike*/
    else if (req.body.like === -1)
    {
        Sauces.updateOne({ _id: req.params.id }, {$inc : {dislikes: 1}, $push : {usersDisliked: req.body.userId}})
        .then(() => {return res.status(200).json({message : 'Dislike ajouté'})})
        .catch(error => res.status(400).json({ error }));
    }
    else
    {
        Sauces.findOne({_id: req.params.id})
        .then(sauce =>
        {
            /*Tableau des likes des Users (LU)*/
            for (let LU = 0; LU< sauce.usersLiked.length; LU++)
            {
                let user = req.body.userId;
                let userLike = sauce.usersLiked[LU];

                if(user === userLike && req.body.like === 0)
                {
                    Sauces.updateOne({ _id: req.params.id }, {$inc: { likes: -1 }, $pull: { usersLiked: req.body.userId }})
                    .then(() => res.status(200).json({message : 'like retiré'}))
                    .catch(error => res.status(400).json({ error }));
                }
            };
            /*Tableau des Dislikes des Users (DU)*/
            for (let DU = 0; DU< sauce.usersDisliked.length; DU++)
            {
                let user = req.body.userId;
                let userDislike = sauce.usersDisliked[DU];

                if(user === userDislike && req.body.like === 0)
                {
                    Sauces.updateOne({ _id: req.params.id }, {$inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId }})
                    .then(() => res.status(200).json({message : 'dislike retiré'}))
                    .catch(error => res.status(400).json({ error }));
                }
            };
        })
        .catch(error => res.status(400).json({ error }));
    }
};