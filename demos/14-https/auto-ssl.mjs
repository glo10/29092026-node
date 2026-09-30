import { exec } from 'node:child_process'
// Attention à exécuter à la racine du projet : node auto-ssl.mjs et créez au préalable le dossier config/ car la résolution des chémins n'a pas été effectué dans ce programme
// Génère une clé privée et un certificat auto-signé valable 90 jours
const command = 'openssl req -x509 -newkey rsa:2048 -keyout config/demo.pem -out config/demo.crt -days 90 -nodes -subj "/CN=localhost"';

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erreur : ${error.message}`);
    return;
  }
  console.log('stdout', stdout, 'stderr', stderr)
  console.log('Certificat et clé générés avec succès !');
});