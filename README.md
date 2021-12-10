# Behhap

---

## Back : NodeJS/ExpressJS API/backoffice


### Installation des modules

Le projet développé dans ce répertoire utilise différents modules que vous devez au préalable installer en tapant la commande suivante à la racine du répertoire : 

```bash
npm install
```

> Cette commande téléchargera le dossier `node_modules` contenant les modules nécessaires.

Le fichier `package.json` à été modifier au niveau de la fonction `start` pour faire en sorte de relancer le serveur NodeJS à chaque modification. Pour ce faire, nous utilisons le module **Nodemone** que nous n'installons pas en tant que dépendance du projet mais globalement dans notre environnement : 

```bash
npm install -g nodemon
```


### Définition des variable d'environnement

```bash
# Serveur
PORT=
MONGO_URL=
BCRYPT=

# COOKIE
COOKIE_SECRET=
COOKIE_NAME=

# JWT
JWT_SECRET=
```


### Exécution du code

Après avoir lancer MongoDB, à la racine du dossier "back" :

```bash
npm start
```
