/**
 *
 *
 * @param {string[]} fields Campos Solicitados
 * @param {Constraint[]} constraints Filtros
 * @param {string[]} sorts Campos da Ordenação
 * @returns {Dataset}
 */
function createDataset(fields, constraints, sorts) {
    try {
        
        var dataset       = DatasetBuilder.newDataset();
        var serviceUrl    = "url_api_digite-AQUI";
        var url           = new java.net.URL(serviceUrl);
        var postData       = new java.lang.StringBuilder();
        
        var connection = url.openConnection();
        connection.setDoOutput(true);
        connection.setRequestMethod("DELETE"); // Método POST,GET 
        
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Authorization", "Bearer XXXXXX"); // USO TOKEN
        
         postData.append("{\"Email\": \"  XXXX \" }");  // Parametros via BODY 
         
        var os = connection.getOutputStream();
        os.write(postData.toString().getBytes());
        os.flush();
        
       var requestCod = connection.getResponseCode();  // Código HTTP request 
       var retorno      = connection.getResponseMessage();
        
        dataset.addColumn('SUCCESS');
        dataset.addColumn('DATA');
        
        var versao = new java.lang.System.getProperty("java.version") ; // version java
        
        dataset.addRow([true, retorno ]);
        
        return dataset;

    } catch (e) {
        
        var error = (!(e.message)) ? e.toString() : e.message;
        var erroMsg = 'datasetTeste' + error + ',LINE:' + e.lineNumber

        dataset.addColumn('SUCCESS');
        dataset.addColumn('ERROR');
        log.error(erroMsg);

        dataset.addRow([false, erroMsg]);

        return dataset;
    }
}

/**
 *
 */
function defineStructure() {

}

/**
 *
 *
 * @param {number} lastSyncDate
 */
function onSync(lastSyncDate) {

}

/**
 *
 *
 * @param user
 * @returns {DatasetMobileSync}
 */
function onMobileSync(user) {

}
