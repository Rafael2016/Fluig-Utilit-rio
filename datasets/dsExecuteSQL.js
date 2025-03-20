/**
 *@GENERIC EXECUTA SQL  BANCO
 * @param {string[OPERACAO,QUERY]} fields 
 * @returns {Dataset}
 * @author Rafael Luz - XPLANNING
 */
 function createDataset(fields, constraints, sorts) {

    try {

         
        var dataset = DatasetBuilder.newDataset();
        var dataSource = "/jdbc/AppDS";

        if (isEmpty(fields))
            throw "PARÂMETROS NECESSÁRIO QUERY E TIPO DE EXECUÇÃO ";


        var ic = new javax.naming.InitialContext();
        var ds = ic.lookup(dataSource);
        var created = false;
        var conn = ds.getConnection();
        var stmt = conn.createStatement();

        var result      = null;
        var OPERACAO    = String(fields[0]);
        var QUERY       = String(fields[1]);
       
        /**
         * @Operações
         */
        switch (OPERACAO) {

            case 'SELECT':

                result = stmt.executeQuery(QUERY);

                var columnCount = result.getMetaData().getColumnCount();

                while (result.next()) {
                    if (!created) {
                        for (var i = 1; i <= columnCount; i++) {
                            var column = result.getMetaData().getColumnName(i);
                            dataset.addColumn(column);
                        }
                        created = true;
                    }
                    var Arr = new Array();
                    for (var i = 1; i <= columnCount; i++) {
                        var obj = result.getObject(result.getMetaData().getColumnName(i));
                        if (null != obj) {
                            Arr[i - 1] = result.getObject(result.getMetaData().getColumnName(i)).toString();
                        }
                        else {
                            Arr[i - 1] = "null";
                        }
                    }
                    dataset.addRow(Arr);
                }


                break;

            case 'DML': //UPDATE , INSERT , DELETE

                result = stmt.executeUpdate(QUERY);
                
                if (!result) {
                   
                    throw 'OCORREU ERRO AO REALIZAR INLCUSÂO DO REGISTRO, ERRO: ' + result.toString();
                }
                else {

                    dataset.addColumn("SUCCESS");
                    dataset.addColumn("MSG");
                    dataset.addColumn("DATA");
                    dataset.addRow(new Array(true, 'OPERAÇÃO REALIZADA COM SUCESSO', result.toString()));

                }

                break;

            case 'CREATE':

                stmt.addBatch(QUERY);
                result = stmt.executeBatch();
                stmt.clearBatch();

                
                if (!result) {

                    throw 'OCORREU ERRO AO CRIAR TABELA, ERRO: ' + result.toString();
                
                }
                else {

                    dataset.addColumn("SUCCESS");
                    dataset.addColumn("MSG");
                    dataset.addColumn("DATA");

                    dataset.addRow(new Array(true, 'TABELA CRIADA COM SUCESSO', result.toString()));
                    // dataset.addRow(new Array(false, 'OCORREU ERRO AO CRIAR TABELA', result.toString()));
                }

                break;

            default:
                throw "OPERAÇÃO INVALIDA";
        }


    } catch (e) {

        var error = (!(e.message)) ? e.toString() : e.message;
        var erroMsg = 'dsGenericExecuteSQL - ERRO:' + error + ',LINE:' + e.lineNumber

        dataset.addColumn('SUCCESS');
        dataset.addColumn('ERROR');
        log.error(erroMsg);
        dataset.addRow([false, erroMsg]);

        return dataset;

    } finally {

        if (stmt != null)
            stmt.close();
        if (conn != null)
            conn.close();

    }

    return dataset;


}

/**
 * @IsEmpty
 */
function isEmpty(elemento) {

    if (elemento == "" || elemento == null || elemento == undefined || elemento == 'undefined' || !elemento)
        return true;

    return false;
}

