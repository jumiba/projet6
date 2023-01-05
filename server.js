/*Requete des modules et dossiers*/
const http = require('http');
const app = require('./app');
const server = http.createServer(app);

/*Serveur*/
server.listen(3000 || process.env.PORT);

if(process.env.PORT === undefined)
{console.log("utilisation du port 3000, le port par defaut n'est pas défini.")}
else
{console.log("le port par défaut est = " + process.env.PORT)};