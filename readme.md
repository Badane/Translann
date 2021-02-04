# Translann

![in development status](https://dannbonderff.fr/assets/images/status-development.png)

Translann is a localization manager web application, based on Vuejs and MongoDB.
It tends to be a free alternative to POEditor, and will embed the following features :

- Add as many translations as needed
- Add as entries as needed
- Export for Android, iOS, PO/POT files, and more...
- Possibility to display a previously translated word, while translating in another language
- Suggestions powered by GoogleTranslate

### Installation

Want to test ?

Translann is fully based on NodeJS.
For the moment, the application works with distinct front-end and back-end.

Open your favorite Terminal and run these commands in **two distinct terminals**.

Front end:
_with npm_

```sh
$  cd ./vue-client
$  npm install
$  npm run serve
```

Back end:
_with npm and nodemon_

```sh
$  cd ./back
$  npm install
$  npm run serve
```

Web interface will be reachable on : [localhost:8081](http://localhost:8081)

### Building

No production commands are currently available.
