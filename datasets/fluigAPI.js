/**
 *@Buscar Grupo
 */
myGroup = fluigAPI.getGroupService();    
myGroup.findUsersByGroup("Financeiro", "", 100, 100, "");
log.dir("myGroup: " + myGroup);
