# Récupérer un projet Node en local

1. Dans les sources, il y a le package.json et package-lock.json
- PS : il n'est pas forcément obligatoire d'avoir package-lock.json (s'il est présent, on aura d'une machine à une autre des sous-dépendances quasi-identique dépendant de la manière dont vous avez défini les versions de vos dépendances (fixe, ~ autorisant les PATCH, ^ autorisant les versions MINOR et PATCH))
2. Reconstruire node_modules en installant toutes les dépendances avec la commande 
```bash
npm install
```
- Pour installer exactement les mêmes versions à l'identique par rapport à ce qui est défini dans le fichier package-lock.json à la place de la commande précédente, il faut exécuter 
```bash
npm ci
```