## Démarrer un nouveau projet Node

1. Initialiser un nouveau projet NPM avec 
```bash
npm init -y
# -y permet de répondre yes à toutes les questions
```
2. Installez les dépendances externes si nécessaire sur tous les environnements
```bash
npm install nomDuPaquet
# par npm install express
# raccourci npm i express
```

3. Installez les dépendances externes si nécessaire uniquement sur l'env de développement (exemples transpilers, librairies tests, etc.)
```bash
npm install -D nomDuPaquet
# par exemple npm install -D typescript vitest supertest cypress
```
---

## Récupérer un projet déjà existant

PS : le collègue vous partage le package.json et package-lock.json pour reconstituer les dépendances du projet sur votre env

```bash
npm install # ou raccourci npm i
```

---

## Versionning

- Chiffres : MAJOR.MINOR.PATCH
- ~ autorise MAJ PATCH exemple si j'ai ~5.2.1 dans mon fichier package.json et que 5.2.2 existe à l'installation je pourrais avoir 5.2.2 d'installé dans mon projet.
- ^ autorise MAJ MINOR et PATCH : ^5.2.1 si 5.4.0 existe je pourrais avoir 5.4.0 alors que j'ai défini dans le fichier ^5.2.1
- Version fixe du module : pas de ~ ou ^ devant la version, j'aurais exactement 5.2.1