exports.action = function(data){

    var moment = require('moment');moment.locale('fr');
    var date = new Date();
    var jour = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();

console.log("Clara doit chercher le mot du jour ")
   
    var fs = require("fs");
    var path = require('path');
    var filePath = __dirname + "/MotDuJour.json";
    var file_content;

    file_content = fs.readFileSync(filePath, 'utf8');
    file_content = JSON.parse(file_content);

    if(typeof file_content[jour] != 'undefined' && file_content[jour] != "") {
        var infos = file_content[jour];
        console.log("Informations: " + infos);
        ClaraIASpeech(infos);
        return;
    } 
    
ClaraIASpeech         var url = 'http://unmotparjour.fr/monotrope/';
        console.log('Url Request: ' + url);
        var request = require('request');
        var cheerio = require('cheerio');

        request({ 'uri': url}, function(error, response, html) {

            if (error || response.statusCode != 200) {
                ClaraIASpeech("La requête vers Google a échoué. Erreur " + response.statusCode );
                return;
            }
            var $ = cheerio.load(html);

        var mot = $('article > header > h1').text().trim()
        var définiton = $('article > div').text().trim()

        var événement = (mot+" , "+définiton); 
            if(événement == "") {   // Si la première version n'existe pas on teste l'autre
        var événement = (mot+" , "+définiton);
        }

            if(événement == "") {
            console.log("Impossible de récupérer le mot du jour pour le "+jour);
            ClaraIASpeech("Désolé, je n'ai pas réussi à trouver le mot du jour pour le "+jour);}       
            else {
                file_content[jour] = "Le mot du jour est : "+événement;
                chaine = JSON.stringify(file_content, null, '\t');
                fs.writeFile(filePath, chaine, function (err) {
                    console.log("[ --- "+jour+" --- ] Mot_du_jour enregistrés");
                });

                console.log("Informations: " + événement);
                ClaraIASpeech("Le mot du jour est : "+événement);
            }
            return;
        });
    }
    
}