# XY Inc POI Localization App (xy-inc-web)

### O Projeto

Single Page Application desenvolvida para permitir o cadastro, visualização e localização de POIs (Pontos de Interesse). Este projeto foi desenvolvido para uma avaliação de competência para a área de front-end, não se tratando de uma aplicação para uso real.

### Tecnologias utilizadas

O projeto foi desenvolvido dentro de padrões modernos para front-end utilizando tecnologias open-source. São elas:

* HTML5
* JavaScript
* CSS
* jQuery
* Bootstrap - Componentes visuais - http://getbootstrap.com/
* [Gulp Js] - Automatização de tarefas como minificação js - http://gulpjs.com/
* [node.js] - API Restful desenvolvida utilizando node js com os módulos restify (REST) e mongoose (MongoDB).
* [MongoDB] - Banco de Dados NoSQL para persistência e rápida consulta de informações.

### Preparação de Ambiente

* Instale o NodeJS conforme instruções para sua plataforma - https://nodejs.org/
* Instale o MongoDB conforme instruções para sua plataforma - https://www.mongodb.org/
* É necessária a conexão e inicialização do Mongo. Ex para Windows:

```sh
$ mongod.exe --dbpath C:\Program Files\MongoDB\data
```

### Instalação

* Acesse o diretório onde os fontes foram clonados
* Carregue os módulos nodejs necessários ao funcionamento da aplicação web utilizando o comando a seguir, o qual gerará a pasta node_modules
```sh
$ npm install
```
* Rode o aplicativo com apenas um comando shell
```sh
$ node zup.js
```
* Acesse o aplicativo http://localhost:3000/app
