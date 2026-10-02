# Explication

- tests automatisés : écrire du code qui permet de vérifier un comportement ou un résultat attendu par notre application

## Libraires pour les tests unitaires

- Native (node:test et node:assert)
- Vitest (le plus populaire, développer par l'écosytème VueJS) : nativement TypeScript, compatible avec Jest
- Jest (ancien roi, écosystème Facebook)

## Logique des tests

- AAA :
    - Arrange : préparer tout ce qu'il faut pour effectuer les tests (importer les fonctions, déclarer les variables, environnement, etc.)
    - Act : appeler la fonction à tester
    - Assert : faire les vérifications
- Critères : FIRST : Fast (<1s), isolé au maximum les briques du code, repetable (même résultat à chaque exécution)
- Les tests doublés (SpyOn, Mock) : simuler l'appel des fonctions pour garantir l'isolation et éviter des connexions à la base de données, API externes.


