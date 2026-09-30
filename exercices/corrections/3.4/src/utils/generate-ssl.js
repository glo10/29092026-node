
import { exec } from 'node:child_process'
import { CONFIG_PATH } from './paths.js';
const cmd = `openssl req -x509 -newkey rsa:2048 -keyout ${CONFIG_PATH}/key.pem -out ${CONFIG_PATH}/cert.crt -days 90 -nodes -subj "/CN=localhost"`;

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erreur : ${error.message}`);
    return;
  }
  console.info('Certificat et clé générés avec succès !');
});