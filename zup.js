/**
 * Zup IT Inovation
 * XY Inc Localization Application
 * @author Tulio de Melo
 * @since 27/07/2015
 */

// Carregando modulos nodejs
var mongoose = require("mongoose"),
    process = require("process"),
    restify = require('restify'),
    fs = require('fs');
    
// Conectando à base de dados MongoDB
var db = mongoose.connection
  , dbPath = 'mongodb://localhost/zup';

db.on('error', console.error);
db.once('open', function() {
    console.log('Conectado ao MongoDB.')
});

 // Criando um Schema/Model MongoDB
var Schema   = mongoose.Schema;
var POISchema = new Schema({
	nomePoi: String,
    coordenadaX: Number,
    coordenadaY: Number
});
mongoose.model('Poi', POISchema);

mongoose.connect(dbPath, function onMongooseError(err) {
	if (err) { 
        throw err;
    }
});    

// Configurando a estrutura de controllers
var controllers = {}
  , controllers_path = process.cwd() + '/app/controllers';

fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file);
    }
})
 
 // Configurando o servidor nodejs utilizando o Restify
var server = restify.createServer();
server.use( restify.fullResponse() )
      .use( restify.bodyParser() );
	
// Configurando Rotas dos Serviços
server.post("/pois", controllers.pois.cadastrarPoi);
server.get("/pois", controllers.pois.listarTodos);
server.get("/poisProximos/:coordenadaX/:coordenadaY/:dmax", controllers.pois.listarPorProximidade);
//server.get(/.*/, restify.serveStatic({
//	'directory': 'app',
//	'default': 'index.html'
//}));
server.get(/.*/, restify.serveStatic({
  'directory': __dirname,
  'default': 'index.html'
}));

var port = process.env.PORT || 3000;
server.listen(port, function (err) {
    if (err) {
        console.error(err);
    }
    else {
        console.log('Aplicativo pronto na porta: ' + port);
    }
});
 
if (process.env.environment == 'production') {
    process.on('uncaughtException', function (err) {
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
    });
}