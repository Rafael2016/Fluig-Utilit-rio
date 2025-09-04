/**
 * @DATASET SINCRONIZADO COPIA BASE USUÁRIO DA PLATAFORMA COMUNICAIN 
 * @author Rafael Luz  
 */
function defineStructure(){

    addColumn("ID_COMUNICAIN" , DatasetFieldType.NUMBER);
    addColumn("NOME");
    addColumn("EMAIL");
    addColumn("MATRICULA",DatasetFieldType.STRING);           
    addColumn("FUNCAO");
    addColumn("DIRETORIA"); 
    addColumn("VICE_PRESIDENCIA");   
    addColumn("LOCALIDADE");      
    addColumn("DATA_NASCIMENTO");    
    addColumn("DATA_ADMISSAO");       
    addColumn("BLOQUEADO");  
    addColumn("SITUACAO");  
    addColumn("EXTERNALID", DatasetFieldType.STRING);    
    addColumn("ERROR"); 

    setKey(["EMAIL"]);
    addIndex(["MATRICULA","EMAIL"]);

}

/**
 *  
 * @param {*} lastSyncDate 
 */
function onSync(lastSyncDate)
{

    try {

        var dataset         = DatasetBuilder.newDataset();
        var dsComunicaIn    = createDataset();
        var emailsComunicaIn = []
        

        /**
         * @Add Registros
         */
        for each(usuario in dsComunicaIn) {

            dataset.addOrUpdateRow([
                             parseInt(usuario["Id"]),           
                             usuario["Nome"],
                             usuario["Email"],
                             usuario["Matrícula"],
                             usuario["Função"],
                             usuario["Diretoria"],
                             usuario["Vice-presidência"],
                             usuario["Localidade"],
                             usuario["Data de nascimento"],
                             usuario["Data de admissão"],
                             usuario["Bloqueado"],
                             usuario["Situação"],
                             usuario["Matrícula"],
                             ""
            ]);

            emailsComunicaIn.push(usuario["Email"]);

        }

       /**
        *@Remove Registros já excluídos da Plataforma ComunicaIn deixando sempre as base dados consistentes
        */
            
        var dsUserComunicaIn = DatasetFactory.getDataset("dsComunicaInRMAsync", null, null, null);
        var indexComunicaIn  = dsUserComunicaIn.rowsCount;
        
        for (var i = 0; i < indexComunicaIn; i++) {

            if (emailsComunicaIn.indexOf(dsUserComunicaIn.getValue(i, "EMAIL")) > -1)
                continue

            dataset.deleteRow([
                parseInt(dsUserComunicaIn.getValue(i, "ID_COMUNICAIN")),
                dsUserComunicaIn.getValue(i, "NOME"),
                dsUserComunicaIn.getValue(i, "EMAIL"),
                dsUserComunicaIn.getValue(i, "MATRICULA"),
                dsUserComunicaIn.getValue(i, "FUNCAO"),
                dsUserComunicaIn.getValue(i, "DIRETORIA"),
                dsUserComunicaIn.getValue(i, "VICE_PRESIDENCIA"),
                dsUserComunicaIn.getValue(i, "LOCALIDADE"),
                dsUserComunicaIn.getValue(i, "DATA_NASCIMENTO"),
                dsUserComunicaIn.getValue(i, "DATA_ADMISSAO"),
                dsUserComunicaIn.getValue(i, "BLOQUEADO"),
                dsUserComunicaIn.getValue(i, "SITUACAO"),
                dsUserComunicaIn.getValue(i, "EXTERNALID"),
                ""
            ]);
        }
        
    } catch (e) {

       var error   = (!(e.message)) ? e.toString() : e.message;
        var erroMsg = "dsCopiaBaseComunicaInAsync - ERRO:" + error + " ,LINE:" + e.lineNumber;

        log.error(erroMsg);
        throw erroMsg;
        
    }
    
    return dataset;

}
/**
 * 
 * @param {*} fields 
 * @param {*} constraints 
 * @param {*} sortFields 
 */
function createDataset(fields, constraints, sortFields) {

       
    try {

        
        var pagina     = 1;
        var proxPag    = true;
        var dataAll    = [];
        
        while(proxPag){

            var param = [
            
                DatasetFactory.createConstraint("method", "GET", "GET", ConstraintType.MUST),
                 DatasetFactory.createConstraint("endpoint", "/person?page="+pagina+"&pageSize=100", "", ConstraintType.MUST),
           ]
    
           var  dsResut = DatasetFactory.getDataset('ds_call_comunicaIn' ,null, param, null);
          
           if((!isEmpty(dsResut) && dsResut.getValue(0,"SUCCESS") == false)){
               throw "ERRO AO BUSCAR DADOS COMUNICAIN  :" + JSONUtil.toJSON(dsResut);
           }
           
            var dados = JSON.parse(dsResut.getValue(0,"DATA"));

            if(dados.List.length <= 0) {

                proxPag = false;

            }else{

                dataAll = dataAll.concat(dados.List);

            }

          pagina++;

        }
        return dataAll;

       
    } catch (e) {

        var error = (!(e.message)) ? e.toString() : e.message;
        throw "dsCopiaBaseComunicaInAsync - ERRO:" + error + ",LINE:" + e.lineNumber;

    } 

}
/**
 * @IsEmpty
 */
function isEmpty(elemento) {

    if (elemento == "" || elemento == null || elemento == undefined || elemento == 'undefined')
        return true;

    return false;
}