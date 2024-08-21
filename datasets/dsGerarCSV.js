/**
 * @Gerar CSV
 * @param {string[]} fields Campos Solicitados
 * @param {Constraint[]} constraints Filtros
 * @param {string[]} sorts Campos da Ordenação
 * @returns {Dataset}
 */
function createDataset(fields, constraints, sorts) {

    try {

        var dataset = DatasetBuilder.newDataset();

        var csvBuilder = new java.lang.StringBuilder();

        /**
         * @Cria Registros CSV (EXCEL)
         */
        csvBuilder.append("Name;Age;City\n");

        for(var i = 1 ; i < 9000 ; i++) {

           
            csvBuilder.append("John Doe:"+i+";30;New York\n");
            csvBuilder.append("Jane Doe:"+i+";25;San Francisco\n");

        }
       

        var stringCSV = csvBuilder.toString();

        var base64CSV = java.util.Base64.getEncoder().encodeToString((new java.lang.String(stringCSV)).getBytes(java.nio.charset.StandardCharsets.ISO_8859_1));

        var docDto           = docAPI.newDocumentDto();

        docDto.setParentDocumentId(38870);
        docDto.setDocumentDescription("testeCSV");
        docDto.setDocumentTypeId("");
        docDto.setDocumentType("1");
        docDto.setVersion(1000);
        log.info("--docDto");log.dir(docDto);
        var attachArray = new java.util.ArrayList();
        var attach      = docAPI.newAttachment();
        var byteArray   = java.util.Base64.getMimeDecoder().decode(base64CSV);

        attach.setFileName('teste' + ".csv");
        attach.setFilecontent(byteArray);
        attach.setPrincipal(true);
        attach.setAttach(false);
        docDto.setColleagueId("admin");  
        docDto.setPublisherId("admin");  

        attachArray.add(attach);

        var doc = docAPI.createDocument(docDto, attachArray, null, null, null);

        dataset.addColumn('RETORNO');

        dataset.addRow([doc.getDocumentId()]);

        return dataset;

    } catch (e) {

        var error = (!(e.message)) ? e.toString() : e.message;
        var erroMsg = 'dsCreateCSV - ERRO:' + error + ',LINE:' + e.lineNumber;

        dataset.addColumn('STATUS');
        dataset.addColumn('MSG');
        log.error(erroMsg);

        dataset.addRow([false, erroMsg]);

        return dataset;

    }

}

/**
 *
 */
