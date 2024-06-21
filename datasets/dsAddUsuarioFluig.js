/**
 * @CRIAR USUÁRIO NO FLUIG
 * @param fields
 * @param constraints [objJSON{}]
 * @param sortFields
 * @autor Rafael Luz 
 */
function createDataset(fields, constraints, sortFields) {

	try {
		
		log.info("dsAddUser , START"); 
		var users = null
		
		if (constraints != null) {

            for (var i = 0; i < constraints.length; i++) {

                if (constraints[i].fieldName == "USERS") {
                	users = JSON.parse(constraints[i].initialValue);
                }
                 
            }

        }


        var ecmColleagueService 	= ServiceManager.getServiceInstance("ECMColleagueService");   
    	var serviceLocator 			= ecmColleagueService.instantiate("com.totvs.ECMColleagueServiceService");		
    	var ecmColleagueServicePort	= serviceLocator.getColleagueServicePort();

    	var colleagueDtoArray 	= ecmColleagueService.instantiate("com.totvs.ColleagueDtoArray"); 
    	

    	var colleagueDto = ecmColleagueService.instantiate("com.totvs.ColleagueDto");
    	var senhaUsuario = users.senha;
    	var loginUsuario = user.login; 
    	var emailUsuario = user.email;
    	var nomeUsuario  = user.nome;
    	
    	colleagueDto.setActive(true);
    	colleagueDto.setAdminUser(false)
    	colleagueDto.setColleagueId(loginUsuario);
    	colleagueDto.setColleagueName(nomeUsuario);
    	colleagueDto.setCompanyId(1);
    	colleagueDto.setEmailHtml(true);
    	colleagueDto.setGroupId("usuario")
    	colleagueDto.setLogin(loginUsuario);
    	colleagueDto.setMail(emailUsuario);
    	colleagueDto.setPasswd(senhaUsuario);
    	
    	
    	
    	colleagueDtoArray.getItem().add(colleagueDto);


       //createColleague("usuarioAdm", "senhaAdm", "codigo_empresa", "objeto array colleagueDto")
    	var resultado =  ecmColleagueServicePort.createColleague("rafael.gluz", "Kl3nPe*x", 1, colleagueDtoArray);
    	
    	if(resultado != "ok"){
    		
    		throw "Erro ao cadastrar o usuário Fluig,ERRO: " + JSONUtil.toJSON(resultado);
    		
    	}

    	dataset.addColumn('SUCCESS');
        dataset.addColumn('DATA');

        dataset.addRow([true, 'USUÁRIOS CRIADOS COM SUCESSO']);
	}

	catch (e) {

		var error = (!(e.message)) ? e.toString() : e.message;
		var erroMsg = 'dsAddUser - ERRO:' + error + ',LINE:'
				+ e.lineNumber
		dataset.addColumn('SUCCESS');
		dataset.addColumn('ERROR');
		log.error(erroMsg);

		dataset.addRow([ false, erroMsg ]);

		return dataset;

	}

}