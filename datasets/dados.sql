-- #QUERY FLUIG

-- PRINCIPAIS TABELAS
✔ DEF_PROCES :  Tabela principal de configuração dos processos
✔ VERS_DEF_PROCES :Tabela auxiliar de versões do processo
✔ DOCUMENTO : Formulario ECM
✔ SERV_DATASET: Tabela de datasets dos formulários/documentos
✔ META_LISTA_REL : Tabela de referência das tabelas de dados dos formulários
✔ FDN_USER : USUÁRIOS
✔ FDN_ROLE  : PAPEIS USUÁRIO 
✔ FDN_USERROLE :  GRUPO USUÁRIO
✔ ESTADO_PROCE : ATIVIDADES DO PROCESSO




-- BUSCAR PROCESSO 
select NUM_PROCES, NR_DOCUMENTO_CARD from proces_workflow where COD_DEF_PROCES = '" + processId + "' and LOG_ATIV = '1'

-- BUSCA DADOS METALIST FORMULARIO "ML00XXXX"

SELECT
l.COD_LISTA_PAI,
	l.COD_LISTA_FILHO,
	d.COD_LISTA,
	l.COD_LISTA_PAI,
	l.COD_LISTA_FILHO,
	l.COD_TABELA,
	d.NUM_DOCTO_PROPRIED,
	d.NUM_VERS_PROPRIED

FROM DEF_PROCES p
	LEFT JOIN VERS_DEF_PROCES vp ON vp.COD_DEF_PROCES = p.COD_DEF_PROCES 
	AND vp.LOG_ATIV = 1
	LEFT JOIN DOCUMENTO d ON d.NR_DOCUMENTO = vp.NUM_PASTA_FORM 
	AND d.VERSAO_ATIVA = 1
	LEFT JOIN SERV_DATASET ds ON ds.COD_DATASET = d.NM_DATASET 
	LEFT JOIN META_LISTA_REL l ON l.COD_LISTA_PAI = d.COD_LISTA 

-- QUERY INFO USUARIOS 

SELECT 
       ut.USER_CODE,
       ut.IDP_ID,
       FU.FULL_NAME,
       ut.LOGIN ,
       ut.EMAIL,
       ut.USER_STATE,
       FU.USER_TYPE 
FROM FDN_USERTENANT ut
INNER JOIN FDN_USER FU ON ut.USER_ID = FU.USER_ID

-- ##  USER 

{
    "ANONYMIZATION_DATE": "null",
    "idp_id": "null",
    "USER_ID": "1",
    "USER_STATE": "1",
    "EMAIL": "wcm@totvs.com.br",
    "LAST_UPDATE_DATE": "2023-01-04 14:08:11.0",
    "LAST_NAME": "WCM",
    "FIRST_NAME": "Admin",
    "USER_TENANT_ID": "1",
    "USER_CODE": "null",
    "ANONYMIZATION_USER_ID": "null",
    "PASSWORD": "a170f9780d20b8a60b2825898d13f0b1",
    "USER_TYPE": "0",
    "USER_UUID": "95342dd0-f8ba-46f5-bed0-939157d69da0",
    "BIRTH_DATE": "null",
    "FULL_NAME": "Admin WCM",
    "TENANT_ID": "0",
    "LOCATION_ID": "null",
    "LOGIN": "wcmadmin",
    "FIRST_ACCESS": "false"
}


-- QUERY GRUPO 

SELECT * FROM FDN_USERROLE

-- ##  GRUPO USER 
{
    "USERROLE_ID": "933",
    "TENANT_ID": "1",
    "LOGIN": "ada.chang.embracon.com.br.1",
    "ROLE_CODE": "user"
}

-- SOLICITAÇÃO  MATRICULA REQUISITANTE  
select cod_matr_requisit  from proces_workflowe

-- ## DATASET LIKE 

var c1           = DatasetFactory.createConstraint("cargo", "%diretor%", "%diretor", ConstraintType.SHOULD)
c1.setLikeSearch(true)
let filtro = new Array(c1)
var ds = DatasetFactory.getDataset('fdwt_campos_adicionais_usuario' ,null, filtro, null);
ds
 
---	## ADM MYSQL
    
--- ## LISTA TODA TABELAS E SCHEMA 
 
 SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
   


