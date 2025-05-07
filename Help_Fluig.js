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

var groupService   = fluigAPI.getGroupService(); 
var groupUser        = groupService.findGroupsByUser("MATRICULA_FLUIG","");

/**
 *@LISTA USUARIO DE UM GRUPO 
 *
 */
var groupService   = fluigAPI.getGroupService(); 
var userGroup      = groupService.findUsersByGroup("COD_GROUP", "", 100, 100, "");
