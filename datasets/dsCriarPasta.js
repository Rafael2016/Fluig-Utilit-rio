/**
 *@CRIA PASTA 
 * @autor Rafael 
 */
 function createDataset(fields, constraints, sortFields) {

    try{
        
            var dataset = DatasetBuilder.newDataset();
         
            var docDto = docAPI.newDocumentDto();
	
            docDto.setDocumentType(1);
            docDto.setParentDocumentId(16515);
            docDto.setDocumentDescription('rafael_teste');
            docDto.setDownloadEnabled(true);
            docDto.setInheritSecurity(true);
            
            newDocument = docAPI.createFolder(docDto, null, null);
            var idPasta = newDocument.getDocumentId();
            
            dataset.addColumn("success");
            dataset.addColumn("idPasta");
            
            dataset.addRow([true,idPasta]);
         
            return dataset;   
         
    }catch(e){
        
        var error = (!(e.message)) ? e.toString() : e.message;
        var errorMgs = 'dsDocAPI - ERRO:' + error + ',LINE:' + e.lineNumber;

        dataset.addColumn('success');
        dataset.addColumn('error');
        dataset.addRow(['false', errorMgs]);

        log.error(errorMgs);
        return dataset;
        
        
    }


}
function onMobileSync(user){}
function defineStructure() {}
function onSync(lastSyncDate) {}