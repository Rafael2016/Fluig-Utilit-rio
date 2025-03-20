function createDataset(fields, constraints, sortFields)
{
    
    var dataset = DatasetBuilder.newDataset();

    try {
        
        var clientService = fluigAPI.getAuthorizeClientService();

        var data = {

            companyId : getValue("WKCompany") + '',
            serviceCode : 'código serviço cadastrado',
            endpoint : 'endPoint do serviço',
            method : 'get', //TIPO DE  METÓDO 
            timeoutService: '180'
        }

        var vo = clientService.invoke(JSON.stringify(data));

        if(vo.getResult() == null || vo.getResult().isEmpty()){

            log.info("RETURN VÁZIO dsBuscarMotivosViagemSync");
        }else{

            var dados = JSON.parse(vo.getResult());

            if(dados instanceof Array){

                /**CRIANDO COLUNA DATASET*/
                for(var key in dados[0]){
                    dataset.addColumn(key);
                }
                
                /**POPULANDO COLUNA DATASET*/
                for(var i=0; i <dados.length; i++){

                    var rows = [];
                    for(var attr in dados[i]){
                        rows.push(dados[i][attr]);
                    }
                    dataset.addRow(rows);
                }

            }
        }


    } catch (e) {

        dataset.addColumn(' ERRO');
        dataset.addColumn('LINHA');

        dataset.addRow([e.toString(),e.lineNumber])
        
    }
    
    return dataset;

}