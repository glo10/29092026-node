# Installation de MongoDB

1. Installez sur Windows ou Mac [Docker Desktop](https://docs.docker.com/get-started/get-docker/).
Pour Linux, consultez [ cette documentation de docker](https://docs.docker.com/desktop/setup/install/linux/) pour installer Docker selon votre distribution Linux.
2. Copiez les fichiers [.env.example](./.env.example) et [docker-compose.yml](./docker-compose.yml) sur votre machine dans un dossier dédie en renommant ***.env.example*** en ***.env***
3. Depuis la racine de votre dossier (où se trouvent les 2 fichiers précédents), lancez la commande suivante pour installer et lancer le serveur MongoDB
```bash
docker compose up -d
```
4. Installez l'extension MongoDB for Visual Studio Code de MongoDB sur VSCode pour y ajouter l'URL locale de votre base serveur MongoDB afin d'avoir une interface graphique pour visualiser vos collections
- URL est à copier est de ce format [mongodb://username:password@localhost:27017/?authSource=admin]() en remplaçant *username* et *password* par vos définies dans votre [.env](./.env.example)

![img](./img/extension.png)