## Fluig Totvs 
<img loading="lazy" src="https://static.imasters.com.br/wp-content/uploads/2019/04/09105826/011.jpg" target="_blank">



## Contatos:

<div>


<a href = "mailto:contato@rafaeluz.net"><img loading="lazy" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/rafael-luz-b221a049/" target="_blank"><img loading="lazy" src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>   
</div>

## Utilitário 🛠️

Dataset's , Widget's e Formulários úteis 

## Funções <b>Client Side</b> 💻

Para consultar dados do ambiente da sessão via JavaScipt (client side) é possível utilizar nos eventos a biblioteca WCMAPI. As propriedades disponíveis através da WCMAPI são:


Método	Especificação
	
	
*  WCMAPI.userCode	Retorna código do usuario 
* WCMAPI.version	Retorna a versão do fluig.	Exemplo: "1.6.2"
* WCMAPI.serverURL	Retorna o endereço principal do servidor do fluig: "http://" ou "https://" seguido do endereço do servidor e a porta (se for diferente de 80).
ou	Exemplo: "http://empresa.fluig.com:8080"
* WCMAPI.getServerURL()
* WCMAPI.organizationId	Retorna o ID do tenant ao qual o usuário está conectado.
ou	Exemplos: "1", "12", "99"
* WCMAPI.getOrganizationId()
* WCMAPI.tenantCode	Retorna o código do tenant ao qual o usuário está conectado.
 ou	Exemplos: "suaempresa", "totvs", "demo"

* WCMAPI.getTenantCode()
* WCMAPI.Create	Envia uma requisição ao servidor do fluig.

	Exemplo:
	`WCMAPI.Create({
	    url: '{url a ser consumida}',
	    contentType: "text/xml",
	    dataType: "xml",
	    data: '{Request}',
	    success: function(data){
	        // código a ser executado em caso de sucesso
	    }
	});`

* WCMAPI.serverContextURL	Retorna a raiz da URL do portal da plataforma.
ou	Valor: "/portal" 
* WCMAPI.getServerContextURL()
* WCMAPI.logoff	Encerra a sessão de um usuário na plataforma.
	Exemplo de utilização na função click de um botão implementado no arquivo JavaScript de um widget:

	`showMessage: function () {
	    $div = $('#helloMessage_' + this.instanceId);
	    $message = $('<div>').addClass('message').append(this.message);
	    $div.append($message);
	 
	    WCMAPI.logoff(); //Chamada da API
	}`


## Tipos de eventos do processo


![image](https://github.com/user-attachments/assets/3906379f-c7d8-4726-b14a-ca0a17e3c2cd)

![image](https://github.com/user-attachments/assets/3ed74d0a-7914-42ad-981b-58e1dd7ee50a)

![image](https://github.com/user-attachments/assets/3ceb4e43-b32e-4fe0-9b6c-f0331f5c440a)

## BANCO DE DADOS FLUIG

| Tabela | Descrição |
|---|---|
| **PROCES_WORKFLOW** | Processo e Solicitações |
| **DEF_PROCES** | Tabela principal de configuração dos processos |
| **VERS_DEF_PROCES** | Tabela auxiliar de versões do processo |
| **TAR_PROCES** | Tarefa da atividade solicitação |
| **TAR_WORKFLOW** | Atividade Processo |
| **DOCUMENTO** | Formulário ECM |
| **FICHARIO** | |
| **SERV_DATASET** | Tabela de datasets dos formulários/documentos; Tabela do Fluig que lista os datasets internos e datasets customizados. |
| **META_LISTA_REL** | Tabela de referência das tabelas de dados dos formulários |
| **FDN_USER** | Usuários |
| **FDN_ROLE** | Papéis Usuário |
| **FDN_USERROLE** | Grupo Usuário [LOGIN/ROLE_CODE/TENANT_ID/USERROLE_ID] |
| **ESTADO_PROCE** | Atividades do Processo |
| **FDN_PARAMGERAL** | Parâmetros Geral Fluig |
| **FDN_ACESSLOG** | Logs de Acessos |






