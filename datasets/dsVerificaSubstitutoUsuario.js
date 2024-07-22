/**
 * @BUSCAR USUÁRIOS SUBSTITUTO 
 * @param {*} fields 
 * @param {*} constraints 
 * @param {*} sortFields 
 * @returns 
 */
function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	var companyId = java.lang.Integer(fluigAPI.getSecurityService().getCurrentTenantId())

	try {
		
		// Monta a sentença sql
		var sentencaSQL = "SELECT * FROM COLAB_SUBSTTO WHERE COD_EMPRESA = '"+companyId+"'";

		// Executa a sentença sql no banco
		dataset = consultarBanco(sentencaSQL);

	} catch (ex) {
		dataset = DatasetBuilder.newDataset();
		dataset.addColumn('ERRO');
		dataset.addRow([ex.toString()]);
		log.error(ex.toString())
	} finally {
		return dataset;
	}
}


/**
 * Retorna o valor initialValue de uma determinada constraint
 * @param {object} constraints Parâmetro obrigatório, constraints recebidas no dataset
 * @param {String} campo Parâmetro obrigatório, constraint que deseja obter o valor
 * @returns {String|boolean} 
 */
function getConstraint(constraints, campo) {
	if ((constraints != null) && (constraints.length > 0)) {
		for (i in constraints) {
			var constraint = constraints[i]
			if (constraint.getFieldName().trim().toUpperCase() == campo.trim().toUpperCase()) {
				return constraint.getInitialValue();
			}
		}
	}
	return false;
}


/**
 * Realiza consulta no próprio banco de dado do Fluig para obter a metaListId da tabela pai e filho
 * @param {String} sentencaSQL Parâmetro obrigatório, consulta sql para ser executada
 * @return {object} Retorna um dataset contendo as colunas e registros da consulta
 * @author Vivian Matos
 */
function consultarBanco(sentencaSQL) {

	var newDataset = DatasetBuilder.newDataset();
	var dataSource = "java:/jdbc/AppDS";
	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);
	var created = false;
	try {
		var conn = ds.getConnection();
		var stmt = conn.createStatement();
		var rs = stmt.executeQuery(sentencaSQL);
		var columnCount = rs.getMetaData().getColumnCount();
		while (rs.next()) {
			if (!created) {
				for (var i = 1; i <= columnCount; i++) {
					newDataset.addColumn(rs.getMetaData().getColumnLabel(i));
				}
				created = true;
			}
			var Arr = new Array();
			for (var i = 1; i <= columnCount; i++) {
				var obj = rs.getObject(rs.getMetaData().getColumnLabel(i));
				if (null != obj) {
					Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnLabel(i)).toString();
				} else {
					Arr[i - 1] = "null";
				}
			}
			newDataset.addRow(Arr);
		}
	} catch (e) {
		log.error("ERRO==============> consultarBanco " + e.message);
	} finally {
		if (rs != null) {
			rs.close();
		}
		if (stmt != null) {
			stmt.close();
		}
		if (conn != null) {
			conn.close();
		}
	}
	return newDataset;
}

