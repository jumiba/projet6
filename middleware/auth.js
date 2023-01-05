/*importation de jsonwebtoken et de dotenv pour l'authentification*/
const jwt = require('jsonwebtoken');
require('dotenv').config();

/*creation du module pour l'authentification de jsonwebtoken*/
module.exports = (req, res, next) =>
{
    try
    {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, `${process.env.PASS}`);
        const userId = decodeToken.userId;
        req.auth =
        {
            userId: userId
        };
	    next();
    }
    catch(error)
    {
    return res.status(403).json({message : "403: unauthorized request"});
    }
};