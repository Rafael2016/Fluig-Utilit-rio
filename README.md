## Fluig Totvs 

## Contatos:

<div>

<a href="https://www.twitch.tv/seu-usuário-aqui" target="_blank"><img loading="lazy" src="https://img.shields.io/badge/Twitch-9146FF?style=for-the-badge&logo=twitch&logoColor=white" target="_blank"></a>
<a href = "mailto:contato@rafaeluz.net"><img loading="lazy" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/rafael-luz-b221a049/" target="_blank"><img loading="lazy" src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>   
</div>

## Utilitário  [!NOTE] [!WARNING]

Dataset's , Widget's e Formulários úteis 

## Funções <b>Client Side</b>

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
	WCMAPI.Create({
	    url: '{url a ser consumida}',
	    contentType: "text/xml",
	    dataType: "xml",
	    data: '{Request}',
	    success: function(data){
	        // código a ser executado em caso de sucesso
	    }
	});
* WCMAPI.serverContextURL	Retorna a raiz da URL do portal da plataforma.
ou	Valor: "/portal" 
* WCMAPI.getServerContextURL()
* WCMAPI.logoff	Encerra a sessão de um usuário na plataforma.
	Exemplo de utilização na função click de um botão implementado no arquivo JavaScript de um widget:
	showMessage: function () {
	    $div = $('#helloMessage_' + this.instanceId);
	    $message = $('<div>').addClass('message').append(this.message);
	    $div.append($message);
	 
	    WCMAPI.logoff(); //Chamada da API
	}




