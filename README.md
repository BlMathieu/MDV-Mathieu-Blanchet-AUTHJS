
# MDV-Mathieu-Blanchet-AUTHJS




## Features

- Implémentation de l'authentification par token access/refresh JWT
- Implémentation de l'authentification par OTP (utiliser google authenticator !)
- Implémentation d'un rate-limiter
- Implémentation de schémas de validation des entrées API pour login/register
- Implémentation de helmetJS pour sécurisé les en-têtes HTTP
- Hashage des mots de passe avec Bcrypt

## FAQ

#### Choix du système d'authentification
L'utilisation de token JWT permet de gérer facilement les instances de connexion.
Couplet avec un "RefreshToken" permet de limiter les risques de vol de token en invalidant plus vite ce dernier.

Côté serveur : le RefreshToken est inséré en base de données pour être vérifié à chaque génération d'AccessToken .
Côté client : le RefreshToken est stocké en cookie httponly pour évité le vol de ce dernier par commande JS. L'AccessToken est stocké en mémoire grâce à un store REDUX.

Concernant l'algorithme de hash des mots de passes, j'ai choisi BCrypt car il s'agit d'un des algorithmes les plus adaptés et utilisés pour la gestion de mots de passe sécurisés. De plus, cette algorithme permet de fortement limiter les attaques par brute-force en créant une latence ajustable.
#### L'utilisation d'OTP

Pour amélioré la sécurité, j'ai couplé l'authentification JWT avec une authentification OTP qui permet d'ajouté une nouvelle couche de sécurité.

Ainsi, lorsque l'utilisateur se connecte, il reçoit un Refresh et un Access token intermédiaire.
Une fois obtenu, une authentification OTP est requise pour regénéré un Refresh et un Access token qui définissent la véritable authentification d'un utilisateur.

#### Sécurité des routes

L'API utilisateur contient les routes sécurisés suivantes :
 - /users/user/:email  (Role Etudiant seulement)
 - /users/etudiants (Role Intervenant ou Administrateur seulement)
 - /users/intervenants (Role Administrateur seulement)

 Ces routes sont sécurisé à l'aide de middlewares. 

 #### Gestion de la base de données
 La base de données est généré avec docker. Lors du lancement de la commande "docker-compose up -d" dans le dossier /docker , le script /docker/scripts/db.sql est exécuté crééant la base de données avec une table "users",  en créant un utilisateur obtenant uniquement les droits SELECT, UPDATE ET INSERT sur la table "users" et supprimant l'utilisateur "root" par défaut.

 #### Lancement de l'application
 Pour lancer le serveur (dossier /backend): 
 - npm install (pour installer les dépendances requises)
 - npm run dev (pour lancer l'application)
 - npm run addUsers (pour créer des utilisateurs  par défauts à l'aide du script /backend/test/addUsers.js une fois le serveur préalablement lancé !)
 - python generateEnv.py (pour générer un fichier .env contenant toutes les variables requises)

 Pour lancer le frontend (dossier /frontend):
 - npm install (pour installer les dépendances)
 - npm run dev (pour lancer le serveur web)
 Concernant le .env, il devra contenir la varariable : 
 - VITE_SERVER_URL (contient l'adresse du backend example : http://localhost:3000)

 Pour lancer la base de données (dossier /docker) :
 - docker compose up -d 

 