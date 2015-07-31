var mongoose = require('mongoose'),
    Poi = mongoose.model("Poi"),
    ObjectId = mongoose.Types.ObjectId;

/**
 * Serviço para cadastrar um novo POI.
 */ 
exports.cadastrarPoi = function(req, res, next) {
    
    var poiModel = new Poi(req.body);
    
    poiModel.save(function(err, poi) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Erro ocorrido: " + err
            });
        } else {
            res.json({
                type: true,
                data: poi
            });
        }
    });
}

/**
 * Método reutilizável responsável por retornar a query que busca todos os pois cadastrados.
 */
function buscaTodosPois(){
   var query = Poi.find({}, 'nomePoi coordenadaX coordenadaY');
   return query;
}

/**
 * Serviço para listar todos os pois.
 */
exports.listarTodos = function(req, res, next) {
    
    var query =  buscaTodosPois();
    query.exec(function(err,listaPois){
       if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Erro ocorrido: " + err
            });
        } else {
            if (listaPois) {
                res.json({
                    type: true,
                    data: listaPois
                });
            } else {
                res.json({
                    type: false,
                    data: "Nenhum POI encontrado"
                });
            }
        }
    });
}

/**
 * Serviço para listar todos os pois de acordo com um ponto
 * de referência e uma distância máxima em metros.
 */ 
exports.listarPorProximidade = function(req, res, next) {
    
    // Obtendo os parâmetros da requisição GET
    var coordenadaX = parseInt(req.params.coordenadaX)
      , coordenadaY = parseInt(req.params.coordenadaY)
      , dmax = parseFloat(req.params.dmax);
      
    var query =  buscaTodosPois();
    query.exec(function(err,listaPois){
       if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Erro ocorrido: " + err
            });
        } else {
            if (listaPois) {
                
                var poisProximos = new Array();
                
                listaPois.forEach(function(poi) {
                    
                    var x = Math.abs(coordenadaX - poi.coordenadaX);
                    var y = Math.abs(coordenadaY - poi.coordenadaY);
                    var distancia = Math.sqrt( Math.pow(x,2) + Math.pow(y,2) );
                    
                    if( distancia <= dmax ) {
                        poisProximos.push(poi);
                    }
                });
                
                res.json({
                    type: true,
                    data: poisProximos
                });
                
            } else {
                res.json({
                    type: false,
                    data: "Nenhum POI encontrado"
                });
            }
        }
    });
}