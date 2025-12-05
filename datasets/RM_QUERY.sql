/**
 * @COLABORADOR PFUNC 
 *
 */
 SELECT A.CODCOLIGADA,
       E.NOME                                                             AS NOME_COLIGADA,
       A.CODFILIAL,
       F.NOMEFANTASIA                                                             AS NOME_FILIAL,
       I.DESCRICAO
       ||' '
       ||F.RUA
       ||', '
       || F.NUMERO                                                        AS ENDERECO_FILIAL,
       F.TELEFONE                                                         AS TEL_FILIAL,
       A.CHAPA,
       A.CODSECAO,
       G.DESCRICAO                                                        AS NOME_SECAO,
       A.CODFUNCAO,
       H.NOME                                                             AS NOME_FUNCAO,
       D.CPF,
       D.DTNASCIMENTO,
       D.CARTIDENTIDADE,
       D.TELEFONE1,
       (SELECT PPESSOA.EMAIL
        FROM   PPESSOA,
               PFUNC XX
        WHERE  XX.CODSITUACAO <> 'D'
               AND PPESSOA.CODIGO = XX.CODPESSOA
               AND XX.CHAPA = (SELECT COD_MATRIC_CHEFIA
                               FROM   A_CICE_NEW.V_FUNCIONARIO Y
                               WHERE  Y.CHAPA = A.CHAPA
                                      AND Y.CODCOLIGADA = A.CODCOLIGADA)) AS CHEFE_IMEDIATO,
       G.NROCENCUSTOCONT                                                  AS CENTRO_CUSTO,
       J.DESCRICAO                                                        AS ESTADO_CIVIL,
       A.CODSITUACAO,
       A.NOME,
       D.EMAIL,
       A.CODTIPO,
       DECODE (A.CODTIPO,'O', 'COMISSIONISTA',
                          'Z', 'APRENDIZ',
                          'A', 'AUTONOMO',
                          'W', 'BENEFICIÁRIO',
                          'I', 'CEDIDO',
                          'C', 'CONSELHEIRO',
                          'V', 'CONTRATO VERDE/AMARELO',
                          'D', 'DIRETOR',
                          'T', 'ESTAGIARIO',
                          'E', 'ESTATUARIO',
                          'X', 'EXPATRIADO',
                          'M', 'MISTO',
                          'N', 'NORMAL',
                          'U', 'OUTROS',
                          'S', 'PENSIONISTA',
                          'R', 'RURAL') AS TIPOFUNC,
                          DIRETORIA_GERAL.DESCRICAO AS DIRETORIA,
        D.SEXO,
        D.TELEFONE2,
        A.DATAADMISSAO,
        K.CODGRUPOOCUP AS COD_GRUPOOCUPACIONAL,
        L.NOMEGRUPOOCUP AS NOME_GRUPOOCUPACIONAL,
        D.GRAUINSTRUCAO,
        (SELECT SEC.DESCRICAO
           FROM RM.PSECAO SEC 
          WHERE SEC.CODIGO = SUBSTR(A.CODSECAO, 1,19)
            AND ROWNUM = 1 
            AND (SEC.DESCRICAO LIKE 'GERENCIA%' OR 
                 SEC.DESCRICAO LIKE 'DIRETORIA REGIONAL%'))  AS GERÊNCIA_DIRETORIA_REGIONAL,
        (A.JORNADAMENSAL/60) AS JORNADA,
        A.CODHORARIO,
        M.DESCRICAO AS HORARIO,
        A.CODSINDICATO,
        N.NOME AS SINDICATO,
        O.ADVERTENCIA, 
        F.NOMEFANTASIA AS NMFANTASIA_FILIAL,
        A.CODBANCOPAGTO AS BANCO,
        A.CODAGENCIAPAGTO AS AGENCIA,
        A.CONTAPAGAMENTO AS CONTA,
        A.TIPOREGIMEJORNADA,
        CASE WHEN O.ACAOTRAB IS NULL THEN 'N' ELSE O.ACAOTRAB END AS ACAOTRAB,
        O.ASSISTMEDBRADESCOINI,
        H.CARGO AS CODCARGO,
        P.NOME AS CARGO
        
FROM   RM.PFUNC A


       INNER JOIN RM.PFUNCAO B ON A.CODCOLIGADA = B.CODCOLIGADA AND A.CODFUNCAO = B.CODIGO
       INNER JOIN RM.PPESSOA D ON A.CODPESSOA = D.CODIGO
       INNER JOIN RM.GCOLIGADA E ON E.CODCOLIGADA = A.CODCOLIGADA
       INNER JOIN RM.GFILIAL F ON F.CODFILIAL = A.CODFILIAL AND F.CODCOLIGADA = A.CODCOLIGADA
       INNER JOIN RM.PSECAO G ON A.CODSECAO = G.CODIGO AND A.CODCOLIGADA = G.CODCOLIGADA
       INNER JOIN RM.PFUNCAO H ON A.CODFUNCAO = H.CODIGO AND A.CODCOLIGADA = H.CODCOLIGADA
       LEFT JOIN RM.DTIPORUA I ON F.TIPORUA = I.CODIGO
       LEFT JOIN RM.PCODESTCIVIL J  ON D.ESTADOCIVIL = J.CODCLIENTE
       LEFT JOIN A_CICE_NEW.COMPLEMENTO_COLABORADOR X ON D.EMAIL = X.EMAIL_VALIDO AND A.CHAPA = X.MATRICULA
       LEFT JOIN RM.PSECAO DIRETORIA_GERAL ON DIRETORIA_GERAL.CODIGO = SUBSTR(A.CODSECAO, 1,16)AND ROWNUM = 1 AND (DIRETORIA_GERAL.DESCRICAO LIKE 'DIRETORIA%'  OR DIRETORIA_GERAL.DESCRICAO LIKE 'ASSESSORIA%') AND DIRETORIA_GERAL.CODCOLIGADA = A.CODCOLIGADA
       LEFT JOIN RM.PCARGO K ON B.CODCOLIGADA = K.CODCOLIGADA AND B.CARGO = K.CODIGO
       LEFT JOIN VGRUPOOCUPACIONAL L ON L.CODGRUPOOCUP = K.CODGRUPOOCUP AND L.CODCOLIGADA = K.CODCOLIGADA
       LEFT JOIN RM.AHORARIO M ON A.CODHORARIO = M.CODIGO AND A.CODCOLIGADA = M.CODCOLIGADA
       LEFT JOIN PSINDIC N ON N.CODCOLIGADA = A.CODCOLIGADA AND N.CODIGO = A.CODSINDICATO
       LEFT JOIN RM.PFCOMPL O ON A.CHAPA = O.CHAPA AND A.CODCOLIGADA = O.CODCOLIGADA
       LEFT JOIN RM.PCARGO P ON P.CODCOLIGADA = H.CODCOLIGADA AND P.CODIGO = H.CARGO
WHERE D.EMAIL LIKE :EMAIL
       /*AND A.CODTIPO <> 'A'*/
       AND A.CHAPA BETWEEN '000001' AND '199999'
       AND A.CHAPA = (SELECT MAX (CHAPA)
                      FROM   PFUNC X,
                             PPESSOA Y
                      WHERE  X.CODCOLIGADA IN ( 1, 6 )
                             AND X.CHAPA BETWEEN '000001' AND '199999'
                             /*AS CHAPAS ESTÃO CHUMBADAS PORQUE A CHAPA ATIVA DO FUNCIONARIO É MENOR QUE A CHAPA DEMITIDA, GERANDO ERRO NA INTEGRAÇAO*/
                             AND X.CHAPA NOT IN ( '055246', '033926', '116636', '123498' )
                             AND X.CODPESSOA = D.CODIGO
                             AND Y.CPF = D.CPF
                             AND X.CHAPA = ( CASE (SELECT J.MOTIVO
                                                          || J.NOVASITUACAO
                                                   FROM   RM.PFHSTSIT J
                                                   WHERE  J.CODCOLIGADA = X.CODCOLIGADA
                                                          AND J.CHAPA = X.CHAPA
                                                          AND J.DATAMUDANCA = (SELECT MAX(I.DATAMUDANCA)
                                                                               FROM   RM.PFHSTSIT I
                                                                               WHERE  I.CODCOLIGADA = J.CODCOLIGADA
                                                                                      AND I.CHAPA = J.CHAPA))
                                               WHEN ( '12'
                                                      ||'D' ) THEN ''
                                               WHEN ( '16'
                                                      ||'D' ) THEN ''
                                               ELSE X.CHAPA
                                             END ))
       AND A.CODCOLIGADA IN ( 1, 6 )
ORDER  BY A.NOME
 

 /**
  *@DADOS FORNECEDOR 
  *
  */

  SELECT * FROM RM.FCFO A
INNER JOIN RM.PPESSOA C ON A.CGCCFO = REGEXP_REPLACE (LPAD(C.CPF, 11),'([0-9]{3})([0-9]{3})([0-9]{3})','\1.\2.\3-')
INNER JOIN RM.PFUNC D ON C.CODIGO = D.CODPESSOA 
WHERE
    C.EMAIL = :EMAIL
AND A.CODCOLIGADA = :CODCOLIGADA
AND A.ATIVO = 1'