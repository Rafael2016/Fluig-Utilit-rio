/**
 * @LER DADOS ARQUIVO CSV A PARTE DO DOCUMENTEID GED
 * @param {string[]} fields Campos Solicitados
 * @param {Constraint[]} constraints Filtros
 * @param {string[]} sorts Campos da Ordenação
 * @returns {Dataset}
 */
function createDataset(fields, constraints, sorts) {
    try {

        var dataset = DatasetBuilder.newDataset();
        
        /**
         * @BUSCAR URL DOCUMENTO GED
         */
        var documentService = fluigAPI.getDocumentService();
        var urlDoc          = documentService.getDownloadURL(41954);

        /**
         * @LER ARQUIVO CSV DA URL
         */

        var url           = new java.net.URL(urlDoc);
        var  streamLine   = new java.io.BufferedReader(new java.io.InputStreamReader(url.openStream(),"ISO-8859-1"));

        var  cabecalho = true; 
        var  linha     = "";
         
        definirColunas(dataset);

         /**
         * @LER LINHA A LINHA DO ARQUIVO CSV
         */
        var linha = "";
            while ((linha = streamLine.readLine()) != null) {
              
                //# Pula Cabeçalho Planilha
                if(cabecalho){
                    cabecalho = false;
                    continue;
                }

                var colunas =[]
                colunas = linha.split(";");

                dataset.addRow([
                    colunas[0],colunas[1],colunas[2],colunas[3],colunas[4],colunas[5],colunas[6],colunas[7],colunas[8],colunas[9],colunas[10],colunas[11],colunas[12],colunas[13]
                ]);
                
            }


        return dataset;

    } catch (e) {

        var error = (!(e.message)) ? e.toString() : e.message;
        var erroMsg = 'dsLerDadosCSV - ERRO:' + error + ',LINE:' + e.lineNumber;

        dataset.addColumn('STATUS');
        dataset.addColumn('MSG');
        log.error(erroMsg);

        dataset.addRow([false, erroMsg]);

        return dataset;

    }
}


 /**
 * @Definir Colunas
 */
function definirColunas(dataset) {

    dataset.addColumn("CODPATRIMONIO");
    dataset.addColumn("IDPATRIMONIO");
    dataset.addColumn("PATRIMONIO");
    dataset.addColumn("DESCRICAO");
    dataset.addColumn("ATIVO");
    dataset.addColumn("CODFILIAL");
    dataset.addColumn("CODCENTROCUSTO");
    dataset.addColumn("SALDORESIDUAL");
    dataset.addColumn("STATUSINVENTARIO");
    dataset.addColumn("ENCONTRADO");
    dataset.addColumn("PLAQUETA_ERRADA");
    dataset.addColumn("ESTADO");
    dataset.addColumn("MOTIVO");


    //Cód.Patrimônio;id.Patrimônio;NºPlaqueta;Descrição;Ativo;Filial;Centro Custos;Saldo Residual;Status Inventário;Encontrado;Plaqueta Errada;Estado;Motivo

}

/**
 * @Validate NULL
 * @param {} elemento 
 * @returns 
 */
function isEmpty(elemento) {

    if (elemento == "" || elemento == null || elemento == undefined || elemento == 'undefined' || JSONUtil.toJSON(elemento) == "{}") 
        return true;
    return false;
}

