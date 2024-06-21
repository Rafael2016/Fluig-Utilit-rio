/**
 * @CRIA REGISTROS FORMUARIOS
 * @param {string[]} fields Campos Solicitados
 * @param {Constraint[IDFORMULARIO,CAMPOS]} constraints Filtros
 *     CAMPOS 
 *      {
 *      values": [
 *        {
 *          "fieldId": "string",
 *          "value": "string"
 *         }
 *       ]
 * @returns {Dataset}
 * @author Rafael Luz 
 */
function createDataset(fields, constraints, sorts) {

    try {
    	
    	 
        var dataset = DatasetBuilder.newDataset();
        var idFormulario = null;
        var campos       = null;

        if (!isEmpty(constraints)) {

            for (var i = 0; i < constraints.length; i++) {

                if (constraints[i].fieldName == "IDFORMULARIO") {

                    idFormulario = constraints[i].initialValue;

                } else if (constraints[i].fieldName == "CAMPOS") {

                    campos = JSON.parse(constraints[i].initialValue);
                }
            }

        }


        var validacao = []

        isEmpty(idFormulario) ? validacao.push('idFormulario') : '';
        isEmpty(campos) ? validacao.push('campos') : '';

        if (validacao.length > 0) {
            throw "Parâmetros obrigatórios não informados : " + validacao.join();
        }



        var data = {
            companyId: "" + getValue("WKCompany"),
            serviceCode: 'fluigAPI',
            method: 'POST',
            endpoint: '/ecm-forms/api/v2/cardindex/'+idFormulario+'/cards',
            timeoutService: '1200',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },

            params: campos
        }

        var clientService = fluigAPI.getAuthorizeClientService();
        var vo            = clientService.invoke(JSONUtil.toJSON(data));
       
        if(vo.getResult() === null || vo.getResult().isEmpty() || vo.httpStatusResult !== 200) {

             throw "Erro ao criar o registro: " + JSONUtil.toJSON(vo)
        }
        
        var res      = JSON.parse(vo.getResult());
         
        dataset.addColumn('SUCCESS');
        dataset.addColumn('MESSAGE');
        dataset.addColumn('IDDOCUMENTO');

        dataset.addRow([true, "Registros  Criados Com Sucesso" , res.cardId]);

    

        return dataset;


    } catch (e) {

        var error = (!(e.message)) ? e.toString() : e.message;
        var erroMsg = '--> dsAddRegisterForm,ERRO:' + error + ',LINE:' + e.lineNumber

        dataset.addColumn('SUCCESS');
        dataset.addColumn('ERROR');

        dataset.addRow([false, erroMsg]);

        return dataset;


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


