/**
 * @CONSOME WsReport RM - Relatorio no RM
 * @param{IDRELATORIO RM , PARAMETROS DO FORMULARIO}
 */
function createDataset(fields, constraints, sortFields) {

    try {

        var dataset = DatasetBuilder.newDataset();

        if (constraints != null) {
            for (var i = 0; i < constraints.length; i++) {
                if (constraints[i].fieldName == "chapa") {
                    log.info(constraints[i].fieldName + " - " + constraints[i].initialValue);
                    chapa = constraints[i].initialValue;
                }
                if (constraints[i].fieldName == "codColigada") {
                    log.info(constraints[i].fieldName + " - " + constraints[i].initialValue);
                    codColigada = constraints[i].initialValue;
                }
                if (constraints[i].fieldName == "idRelatorio") {
                    log.info(constraints[i].fieldName + " - " + constraints[i].initialValue);
                    idRelatorio = parseInt(constraints[i].initialValue);
                }
            }
        }

        /**
         * @Autenticação RM 
         */
        var connector = DatasetFactory.getDataset("ds_rm_conector", null, null, null);
        var usuario = connector.getValue(0, "INTEGRADOR");
        var senha = connector.getValue(0, "SENHA");

        /**
         *@SOAP WSREPORT RM
         */

        var authService = getWebService("wsReport", "com.totvs.WsReport", usuario, senha, "com.totvs.IwsReport");
        var resultado = authService.getReportInfo(0, idRelatorio);
        var filtro = resultado.string.get(0);

        var param = '<?xml version=\"1.0\" encoding=\"utf-16\"?>' +
            '<ArrayOfRptParameterReportPar xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://www.totvs.com.br/RM/\">' +
            '<RptParameterReportPar>' +
            '<Description>Coligada</Description>' +
            '<ParamName>CODCOLIGADA</ParamName>' +
            '<Type xmlns:d3p1=\"http://schemas.datacontract.org/2004/07/System\" xmlns:d3p2=\"-mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089-System-System.RuntimeType\" i:type=\"d3p2:RuntimeType\" xmlns:d3p3=\"-mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089-System-System.UnitySerializationHolder\" z:FactoryType=\"d3p3:UnitySerializationHolder\" xmlns:z=\"http://schemas.microsoft.com/2003/10/Serialization/\">' +
            '<Data xmlns:d4p1=\"http://www.w3.org/2001/XMLSchema\" i:type=\"d4p1:string\" xmlns=\"\">System.String</Data>' +
            '<UnityType xmlns:d4p1=\"http://www.w3.org/2001/XMLSchema\" i:type=\"d4p1:int\" xmlns=\"\">4</UnityType>' +
            '<AssemblyName xmlns:d4p1=\"http://www.w3.org/2001/XMLSchema\" i:type=\"d4p1:string\" xmlns=\"\">mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</AssemblyName>' +
            '</Type>' +
            '<Value xmlns:d3p1=\"http://www.w3.org/2001/XMLSchema\" i:type=\"d3p1:string\">' + codColigada + '</Value>' +
            '<Visible>true</Visible>' +
            '</RptParameterReportPar>' +
            '<RptParameterReportPar>' +
            '<Description>Chapa</Description>' +
            '<ParamName>CHAPA</ParamName>' +
            '<Type xmlns:d3p1=\"http://schemas.datacontract.org/2004/07/System\" xmlns:d3p2=\"-mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089-System-System.RuntimeType\" i:type=\"d3p2:RuntimeType\" xmlns:d3p3=\"-mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089-System-System.UnitySerializationHolder\" z:FactoryType=\"d3p3:UnitySerializationHolder\" xmlns:z=\"http://schemas.microsoft.com/2003/10/Serialization/\">' +
            '<Data xmlns:d4p1=\"http://www.w3.org/2001/XMLSchema\" i:type=\"d4p1:string\" xmlns=\"\">System.String</Data>' +
            '<UnityType xmlns:d4p1=\"http://www.w3.org/2001/XMLSchema\" i:type=\"d4p1:int\" xmlns=\"\">4</UnityType>' +
            '<AssemblyName xmlns:d4p1=\"http://www.w3.org/2001/XMLSchema\" i:type=\"d4p1:string\" xmlns=\"\">mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</AssemblyName>' +
            '</Type>' +
            '<Value xmlns:d3p1=\"http://www.w3.org/2001/XMLSchema\" i:type=\"d3p1:string\">' + chapa + '</Value>' +
            '<Visible>true</Visible>' +
            '</RptParameterReportPar>' +
            '</ArrayOfRptParameterReportPar>';

        var GUID = authService.generateReport(0, idRelatorio, filtro, param, 'arquivo.pdf', '');
        var offset = 0;

        var len = parseInt(authService.getGeneratedReportSize(GUID));
        var result = authService.getFileChunk(GUID, offset, len);

        dataset.addColumn("ERRO");	
		dataset.addColumn("MENSAGEM");	
		dataset.addColumn("HASH");	//BASE64 RELATÓRIO

        dataset.addRow([RETORNO.ERRO, RETORNO.MENSAGEM, RETORNO.HASH]);	

        return dataset;


    } catch (e) {

        var error = (!(e.message)) ? e.toString() : e.message;
        var errorMgs = 'dsDocAPI - ERRO:' + error + ',LINE:' + e.lineNumber;

        dataset.addColumn('success');
        dataset.addColumn('error');
        dataset.addRow(['false', errorMgs]);

        log.error(errorMgs);
        return dataset;


    }

}