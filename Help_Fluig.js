/***
 * CÓDIGO E SCRIPT  RESOLUÇÃO
 */

/**
 * @Cancelar em Script do Processo
 */

var instanceId = 54243; // número da solicitação a ser cancelada
var vo = new com.fluig.sdk.api.workflow.CancelInstanceVO();
vo.setProcessInstanceId(instanceId); 
vo.setCancelText("Cancelamento via script de evento de processos");

var result = fluigAPI.getWorkflowService().cancelInstance(vo);

/**
 * @Cancelar via Dataset SOAP 
 * 
 */
var svc = ServiceManager.getService('ECMWorkflowEngineService');
var serviceHelper = svc.getBean();
var workflowEngineSS = serviceHelper.instantiate('com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService');
var workflowEngine = workflowEngineSS.getWorkflowEngineServicePort();
var result = workflowEngine.cancelInstance(
                                          login, 
                                           senhaIntegracao, 
                                            companyId, 
                                           "Nº Solicitação", 
                                           "Matrícula usuário", // Tem que ser o Gestor ou usuário que abriu a solicitação
                                           "Mensagem")


/***
 * @LISTA TODA ATIVIDADE DE PROCESSO
 *
 */
let fields = ["processStatePK.processId", "stateName", "stateDescription", "processStatePK.sequence"];
let orders = ["processStatePK.sequence"];
let  param = [
    DatasetFactory.createConstraint("processStatePK.processId", "movimentacao_funcional", "movimentacao_funcional", ConstraintType.MUST)
]
let ds     = DatasetFactory.getDataset("processState", fields, param, orders);
let vals  = ds.values;

// Criando um Set para armazenar itens únicos
let uniqueItems = new Set();

// Ordenando os valores pelo atributo "processStatePK.processId"
vals.sort((a, b) => a["processStatePK.processId"].localeCompare(b["processStatePK.processId"]));

for (let i = 0; i < vals.length; i++) {
    let item = vals[i];
    let key = `${item["processStatePK.processId"]},${item["stateDescription"]},${item["stateName"]},${item["processStatePK.sequence"]}`;
    
    // Adicionando ao Set para evitar duplicatas
    if (!uniqueItems.has(key)) {
        ;
        uniqueItems.add(key);
    }
}
                                            


/**
 *@LISTA GRUPOS DO USUÁRIO
 *
 */

var groupService    = fluigAPI.getGroupService(); 
var groupUser        = groupService.findGroupsByUser("MATRICULA_FLUIG","");

/**
 *@LISTA USUARIO DE UM GRUPO 
 *
 */
var groupService   = fluigAPI.getGroupService(); 
var userGroup      = groupService.findUsersByGroup("COD_GROUP", "", 100, 100, "");

/**
 * @USER FLUIG API
 */

var userDvo = fluigAPI.getUserService().findByLogin("login_usuario");


/**
 *@Deletar Documento
 */
var exclui = fluigAPI.getDocumentService().deleteDocument(documentId);


/**
 *@Excluir Solicitação 
 */

var instanceId = 73; // número da solicitação a ser cancelada
        var vo = new com.fluig.sdk.api.workflow.CancelInstanceVO();
        vo.setProcessInstanceId(instanceId); 
        vo.setCancelText("Cancelamento via script de evento de processos");

        fluigAPI.getWorkflowService().cancelInstance(vo);


/**
 *@Ler Anexo e montar parametros com link para envio 
 */
var docs = hAPI.listAttachments();

             
for (var i = 0; i < docs.size(); i++) {
    var doc = docs.get(i);
    if(doc.getDocumentDescription() == "meuRelatorio.pdf"){
        parametros.put("LINK_RELATORIO", fluigAPI.getDocumentService().getDownloadURL(doc.getDocumentId()));
    }
}

/**
 * @PROIBIR TRANSFERÊNCIA PRAMETROS WKIsTransfer
 */

function beforeTaskCreate(colleagueId) {
    var isTransfer = getValue("WKIsTransfer");
 
    if (isTransfer !== null) {
        if (JSON.parse(isTransfer)) {
            throw "Não é permitido transferir a atividade!";
        }
    }
}

/**
 *
 *@Validar antes de Transferir solicitações
 */
function resolve(process,colleague){

    var userList = new java.util.ArrayList();
    var codFilial = hAPI.getCardValue("codFilial");
    
    
    if (!valorEmBranco(codFilial)){
        var filtro = new Array();
        filtro.push(DatasetFactory.createConstraint('groupPK.groupId','EstoqueFilial_'+codFilial, 'EstoqueFilial_'+codFilial, ConstraintType.MUST));
        var dsGrupos = DatasetFactory.getDataset('group', null, filtro, null);
        if (dsGrupos != null && dsGrupos != undefined && dsGrupos.rowsCount>0){
            var grupo = dsGrupos.getValue(0, "groupPK.groupId");
            userList.add("Pool:Group:"+grupo);
        }
        else {
            userList.add( 'Pool:Role:admin');
        }
        
    
    }
    else {
        userList.add( 'Pool:Role:admin');
    }   
    
    return userList;
}

/// ANEXAR  DOCUMENTO A SOLICITAÇÃO ATRAVES DO IDDOCUMENTO JÁ EXISTENTE NO GED
hAPI.attachDocument("Número Documento");

/**
 *@Movimenta Solicitacao 
*/

let param = 
    {
   "movementSequence": 21,
    "assignee": "71e8597c4e8a4523a9c202bed1a9c8c1",      // Matricula usuario atual atividade
    "targetState": 21,
    "targetAssignee": "397a543ef16f40dcbee7938dbdc8a74b",  // Matricula usuario destino
    "subProcessTargetState":1,
    "comment": "Teste Movimentação",
    "asManager": true
   
}

let ds = DatasetFactory.getDataset("dsCallAPIFluig", 
    null, [
        DatasetFactory.createConstraint("endpoint", "/process-management/api/v2/requests/80782/move", "", ConstraintType.MUST),
        DatasetFactory.createConstraint("method","POST", "" , ConstraintType.MUST),
        DatasetFactory.createConstraint("parametros", JSON.stringify(param), "", ConstraintType.MUST)
        
    ],  null);

ds 
