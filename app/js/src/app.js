'use strict';

jQuery(document).ready(function($) {
    
    // Aplicação de máscaras
    $('.numero').mask('0#');
    
    /* Ações para menu */
    $('.menu a').on('click',function() {
        $('.menu a').parent().removeClass('ativo');
        var paginaAbrir = $(this).data('pagina');
        $(this).parent().addClass('ativo');
        $('#' + paginaAbrir).fadeIn('slow');
        fechaOutras();
    });
    function fechaOutras() {
        
        $('#apresentacao').hide();
        
        // Percorro todos os demais que não tem a classe e inativo
        $('.menu a').each(function() {
            var paginaFechar = $(this).data('pagina');
            if( !$(this).parent().hasClass('ativo') ) {
                $('#' + paginaFechar).fadeOut();
            }
        });
    }
    
    /**
     * Listners para tela de cadastro de POIS
     */
    $('#btnCadastrarPoi').on('click', function(event) {
        
        event.preventDefault();
        
        var nomePoi = $('#nomePoi').val()
          , coordenadaX = $('#coordenadaX').val()
          , coordenadaY = $('#coordenadaY').val();
        
        if( isEmpty( nomePoi ) || isEmpty( coordenadaX ) || isEmpty( coordenadaY ) ) {
            mensagem("Todos os campos são de preenchimento obrigatório.", "INFO");
        }
        else {
            $.ajax({
                type: "POST",
                url: "/pois",
                data: JSON.stringify({ 'nomePoi': nomePoi
                                     , 'coordenadaX': coordenadaX
                                     , 'coordenadaY': coordenadaY}),
                contentType: "application/json",
                success: function(res){
                    if( res.type ) {
                        mensagem("POI Cadastrado com sucesso", "SUCESSO");
                    }
                },
                error:function(res) {
                    mensagem("Falha ao cadastrar POI", "ERRO");
                }
            });
        }
    });
    
    /*
    * Listners para tela meus POIs
    */
    $('#menuMeusPois').on('click', function() {
        
        $.ajax({
            type: "GET",
            url: "/pois",
            dataType: "json",
            success: function(res){
                if( res.type ) {
                    
                    if( res.data.length > 0 ) {
                        $('.listaPois').fadeIn();
                        $('.noPois').hide();
                    }
                    
                    jQuery.each(res.data, function(i, poi) {
                        
                        var html = '';
                        
                        html += '<tr>';
                            html += '<td>';
                                html += poi.nomePoi;
                            html += '</td>';
                            html += '<td>';
                                html += poi.coordenadaX;
                            html += '</td>';
                            html += '<td>';
                                html += poi.coordenadaY;
                            html += '</td>';
                        html += '</tr>';
                       
                        $('#tableMeusPois > tbody').append(html);
                    });
                }
            },
            error:function(res) {
                mensagem("Falha ao obter POIS cadastrados.", "ERRO");
            }
        });
        
    });
    
    /*
     * Listners para tela de POIS Próximos
    */
    $('#btnPesquisaPois').on('click', function(event) {
        
        event.preventDefault();
        
        var coordenadaX = $('#coordenadaXPesq').val()
          , coordenadaY = $('#coordenadaYPesq').val()
          , dmax= $('#dmaxPesq').val();
        
        if( isEmpty( coordenadaX ) || isEmpty( coordenadaY ) || isEmpty( dmax ) ) {
            mensagem("Todos os campos são de preenchimento obrigatório.", "INFO");
        }
        else {
            $.ajax({
                type: "GET",
                url: "/poisProximos/"+coordenadaX+"/"+coordenadaY+"/"+dmax,
                dataType: "json",
                success: function(res){
                    if( res.type ) {

                        jQuery.each(res.data, function(i, poi) {

                            var html = '';

                            html += '<tr>';
                                html += '<td>';
                                    html += poi.nomePoi;
                                html += '</td>';
                                html += '<td>';
                                    html += poi.coordenadaX;
                                html += '</td>';
                                html += '<td>';
                                    html += poi.coordenadaY;
                                html += '</td>';
                            html += '</tr>';

                            $('#tableMeusPoisProximos > tbody').append(html);
                        });

                        $('.resultadoPesquisa').fadeIn();
                    }
                },
                error:function(res) {
                    mensagem("Falha ao obter POIS próximos.", "ERRO");
                    $(resultadoPesquisa).fadeOut();
                }
            });
        }
        
    });
    
});

// Lib - Biblioteca de Funções úteis

function isEmpty(str) {
	return(!str || $.trim(str) === "");
}

function mensagem(msg, tipo) {
	
	$('.msgClientSide').addClass('alert');
	
	// Remove mensagens previamente lançadas por validações anteriores.
	$('.msgClientSide').removeClass('alert-success');
	$('.msgClientSide').removeClass('alert-info');
	$('.msgClientSide').removeClass('alert-warning');
	$('.msgClientSide').removeClass('alert-danger');
	
	if(tipo != undefined) { 
		if(tipo == "ERRO") {
			$('.msgClientSide').addClass('alert-danger');
		}
		else if(tipo == "INFO") {
			$('.msgClientSide').addClass('alert-info');
		}
		else if(tipo == "SUCESSO") {
			$('.msgClientSide').addClass('alert-success');
		}
		else {
			$('.msgClientSide').addClass('alert-warning');
		}
	}
	else {
		$('.msgClientSide').addClass('alert-warning');
	}
	
	$('html, body').animate({ scrollTop: 0 }, 'slow');
	$('.msgClientSide').html(msg);
	$('.msgClientSide').fadeIn('slow');
	$('.msgClientSide').delay(6000).fadeOut("slow");
}