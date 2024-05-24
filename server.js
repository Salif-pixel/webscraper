const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs')
// URL de la page Wikipédia

const url = process.argv[2];

if (!url) {
  console.error('Veuillez fournir une URL en ligne de commande.');
  process.exit(1);
}
axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // Sélection de l'élément contenant le texte principal
    const mainContent = $('#mw-content-text').text();
    const dictionnaire = mainContent.replace(/ /g, '\n');
    console.info("exportation en cours ...")
    fs.writeFile('dictionnaire.txt', dictionnaire, (err) => {
        if (err) {
          console.error('Erreur lors de l\'écriture du fichier:', err);
        } else {
          console.log('Le dictionnaire a été exporté avec succès dans dictionnaire.txt');
        }
      });    
   
  })
  .catch(error => {
    console.error(`Erreur lors de la récupération de la page: ${error}`);
  });
