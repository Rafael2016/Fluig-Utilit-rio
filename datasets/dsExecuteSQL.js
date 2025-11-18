/**
 *@GENERIC EXECUTA SQL  BANCO  
 * @param {string[OPERACAO,QUERY,PARAMS]} fields 
 *   - OPERACAO: 'SELECT' | 'DML' | 'CREATE'
 *   - QUERY: SQL com placeholders ? (para SELECT/DML/CREATE)
 *   - PARAMS: opcional, array de valores ou JSON string representando array.
 *     Cada elemento pode ser:
 *       - valor primitivo (será enviado como string)
 *       - objeto { type: 'INT'|'LONG'|'DOUBLE'|'BOOLEAN'|'DATE'|'TIMESTAMP'|'STRING', value: ... }
 * @returns {Dataset}
 * @author Rafael Luz 
 */
function createDataset(fields, constraints, sorts) {

    var dataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/AppDS";

    var ic = null;
    var ds = null;
    var conn = null;
    var pstmt = null;
    var rs = null;

    try {

        // validação básica de inputs
//        if (!Array.isArray(fields) || fields.length < 2 || isEmpty(fields[0]) || isEmpty(fields[1])) {
//            throw "PARÂMETROS NECESSÁRIO: [OPERACAO, QUERY, (PARAMS_OPCIONAL)]";
//        }

        var OPERACAO = String(fields[0] || '').toUpperCase();
        var QUERY = String(fields[1] || '');

        // parse params se houver
        var params = [];
        if (!isEmpty(fields[2])) {
            try {
                // se for string JSON
                if (typeof fields[2] === 'string') {
                    params = JSON.parse(fields[2]);
                } else {
                    params = fields[2];
                }
            } catch (pe) {
                // se não for JSON válido, tenta usar direto
                params = fields[2];
            }
        }
        if (!Array.isArray(params)) {
            // se foi passado um único valor, normaliza para array
            params = [params];
        }

        ic = new javax.naming.InitialContext();
        ds = ic.lookup(dataSource);
        conn = ds.getConnection();

        switch (OPERACAO) {

            case 'SELECT':
                pstmt = conn.prepareStatement(QUERY);
                bindParams(pstmt, params);
                rs = pstmt.executeQuery();

                var meta = rs.getMetaData();
                var columnCount = meta.getColumnCount();
                var created = false;

                while (rs.next()) {
                    if (!created) {
                        for (var c = 1; c <= columnCount; c++) {
                            var column = meta.getColumnLabel(c);
                            dataset.addColumn(column);
                        }
                        created = true;
                    }
                    var row = new Array(columnCount);
                    for (var c = 1; c <= columnCount; c++) {
                        var obj = rs.getObject(c);
                        // manter null em vez de string "null"
                        row[c - 1] = (obj !== null && obj !== undefined) ? obj.toString() : null;
                    }
                    dataset.addRow(row);
                }

                break;

            case 'DML': // UPDATE, INSERT, DELETE
            case 'CREATE': // DDL/CREATE
                pstmt = conn.prepareStatement(QUERY);
                bindParams(pstmt, params);
                var updateCount = pstmt.executeUpdate(); // retorna int

                dataset.addColumn("SUCCESS");
                dataset.addColumn("MSG");
                dataset.addColumn("DATA");

                // executeUpdate retorna número de linhas afetadas ou 0; considerar >= 0 como sucesso
                if (typeof updateCount === 'number' && updateCount >= 0) {
                    dataset.addRow(new Array(true, 'OPERAÇÃO REALIZADA COM SUCESSO', String(updateCount)));
                } else {
                    dataset.addRow(new Array(false, 'OCORREU ERRO AO REALIZAR OPERAÇÃO', String(updateCount)));
                }

                break;

            default:
                throw "OPERAÇÃO INVALIDA";
        }

    } catch (e) {

        var error = (!(e && e.message)) ? String(e) : e.message;
        var erroMsg = 'dsGenericExecuteSQL - ERRO:' + error + (e && e.lineNumber ? (',LINE:' + e.lineNumber) : '');

        dataset.addColumn('SUCCESS');
        dataset.addColumn('ERROR');
        log.error(erroMsg);
        dataset.addRow([false, erroMsg]);

        return dataset;

    } finally {

        try {
            if (rs != null) rs.close();
        } catch (er) { /* ignore */ }
        try {
            if (pstmt != null) pstmt.close();
        } catch (er) { /* ignore */ }
        try {
            if (conn != null) conn.close();
        } catch (er) { /* ignore */ }
    }

    return dataset;
}

/**
 * Faz bind dos parâmetros em PreparedStatement.
 * Suporta parâmetros primitivos ou objetos {type, value}.
 */
function bindParams(pstmt, params) {
    if (!params || !params.length) return;

    for (var i = 0; i < params.length; i++) {
        var idx = i + 1;
        var p = params[i];

        // se for objeto com tipo explícito
        if (p && typeof p === 'object' && p.hasOwnProperty('type') && p.hasOwnProperty('value')) {
            var t = String(p.type).toUpperCase();
            var v = p.value;
            switch (t) {
                case 'INT':
                case 'INTEGER':
                    pstmt.setInt(idx, parseInt(v, 10));
                    break;
                case 'LONG':
                    pstmt.setLong(idx, java.lang.Long.parseLong(String(v)));
                    break;
                case 'DOUBLE':
                case 'FLOAT':
                    pstmt.setDouble(idx, parseFloat(v));
                    break;
                case 'BOOLEAN':
                    pstmt.setBoolean(idx, Boolean(v));
                    break;
                case 'DATE':
                case 'TIMESTAMP':
                    // tenta criar Timestamp a partir de string ISO; se falhar envia null
                    try {
                        var Timestamp = java.sql.Timestamp;
                        // espera formato 'yyyy-mm-dd hh:mm:ss' ou ISO com T (tentativa)
                        var tsValue = String(v).replace('T', ' ');
                        pstmt.setTimestamp(idx, Timestamp.valueOf(tsValue));
                    } catch (errTs) {
                        pstmt.setString(idx, String(v));
                    }
                    break;
                case 'STRING':
                default:
                    pstmt.setString(idx, String(v));
                    break;
            }
        } else {
            // valor primitivo: envia como string (safe binding)
            // aceita null/undefined
            if (p === null || typeof p === 'undefined') {
                pstmt.setObject(idx, null);
            } else if (typeof p === 'number') {
                // números por padrão tratamos como DOUBLE para compatibilidade; DB fará conversão
                pstmt.setObject(idx, new java.lang.Double(p));
            } else if (typeof p === 'boolean') {
                pstmt.setBoolean(idx, p);
            } else {
                pstmt.setString(idx, String(p));
            }
        }
    }
}

/**
 * @IsEmpty
 */
function isEmpty(elemento) {
    if (elemento == "" || elemento == null || elemento == undefined || elemento == 'undefined' || !elemento)
        return true;
    return false;
}
