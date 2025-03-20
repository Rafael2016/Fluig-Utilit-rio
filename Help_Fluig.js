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