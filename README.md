# Student Well-being Application

Ce projet est une application de bien-être étudiant qui permet aux utilisateurs de répondre à des questions de santé mentale et de suivre leur progression au fil du temps. L'application fournit également des recommandations en fonction des réponses des utilisateurs.

## Fonctionnalités

- Formulaire de questionnaire permettant aux utilisateurs de répondre avec une note de 1 à 5 sur différents thèmes.
- Authentification des utilisateurs avec création de compte et connexion.
- Suivi de la progression des utilisateurs avec des graphiques.
- Recommandations en fonction des notes les plus basses des utilisateurs.

## Technologies Utilisées

- Frontend : React.js
- Backend : Node.js avec Express.js
- Base de données : MySQL

## Comment faire fonctionner le projet

### Backend

1. Ouvrez un terminal.
2. Naviguez vers le répertoire du serveur en utilisant la commande suivante :
    ```
    cd server/
    ```
3. Installez toutes les dépendances en exécutant la commande :
    ```
    npm install
    ```
4. Démarrez le serveur en utilisant la commande :
    ```
    npm start
    ```

### Frontend

1. Ouvrez un nouveau terminal.
2. Naviguez vers le répertoire du client en utilisant la commande suivante :
    ```
    cd client/
    ```
3. Installez toutes les dépendances en exécutant la commande :
    ```
    npm install
    ```
4. Démarrez le client en utilisant la commande :
    ```
    npm run dev
    ```

### Test Frontend

npm test -- --config=jest.config.cjs


### Test Backend

npx mocha tests/routes.test.js

Assurez-vous que MySQL est installé et en cours d'exécution sur votre machine. Vous devrez également configurer les informations de connexion à la base de données dans le fichier `config/db.config.js` du backend.
