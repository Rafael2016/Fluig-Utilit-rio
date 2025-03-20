function createDataset(fields, constraints, sortFields) {
   
    var C_URL = "";
    var C_PARAMS = "";
    var C_CONTENT_TYPE = "";
    var C_TYPE = "";
    var C_ENCODE = "";
    var C_HEADER_NAME = "";
    var C_HEADER_VALUE = "";
    var C_HEADER_NAME_2 = "";
    var C_HEADER_VALUE_2 = "";
    var dataset = DatasetBuilder.newDataset();
    try {
        if (constraints != null) {
            for (var i = 0; i < constraints.length; i++) {
                if (constraints[i].fieldName == "C_PARAMS") {
                    C_PARAMS = constraints[i].initialValue;
                }
                if (constraints[i].fieldName == "C_CONTENT_TYPE") {
                    C_CONTENT_TYPE = constraints[i].initialValue;
                }
                if (constraints[i].fieldName == "C_TYPE") {
                    C_TYPE = constraints[i].initialValue;
                }
                if (constraints[i].fieldName == "C_URL") {
                    C_URL = constraints[i].initialValue;
                }
                if (constraints[i].fieldName == "C_ENCODE") {
                    C_ENCODE = constraints[i].initialValue;
                }
                if (constraints[i].fieldName == "C_HEADER_NAME") {
                    C_HEADER_NAME = constraints[i].initialValue;
                }
                if (constraints[i].fieldName == "C_HEADER_NAME_2") {
                    C_HEADER_NAME_2 = constraints[i].initialValue;
                }
                if (constraints[i].fieldName == "C_HEADER_VALUE") {
                    C_HEADER_VALUE = constraints[i].initialValue;
                }
                if (constraints[i].fieldName == "C_HEADER_VALUE_2") {
                    C_HEADER_VALUE_2 = constraints[i].initialValue;
                }
            }
        }
        var serviceUrl = C_URL;
        var url = new java.net.URL(serviceUrl);
        var connection = url.openConnection();
        var postData = new java.lang.StringBuilder();
        connection.setDoOutput(true);
        connection.setRequestMethod(C_TYPE);
        if (C_HEADER_NAME != "" && C_HEADER_NAME != null && C_HEADER_NAME != undefined && C_HEADER_VALUE != "" && C_HEADER_VALUE != undefined && C_HEADER_VALUE != null) {
            connection.setRequestProperty(C_HEADER_NAME, C_HEADER_VALUE);
        }
        if (C_HEADER_NAME_2 != "" && C_HEADER_NAME_2 != null && C_HEADER_NAME_2 != undefined && C_HEADER_VALUE_2 != "" && C_HEADER_VALUE_2 != undefined && C_HEADER_VALUE_2 != null) {
            connection.setRequestProperty(C_HEADER_NAME_2, C_HEADER_VALUE_2);
        }
        if (C_CONTENT_TYPE != "" && C_CONTENT_TYPE != null && C_CONTENT_TYPE != undefined && C_PARAMS != "" && C_PARAMS != null && C_PARAMS != undefined) {
            postData.append(C_PARAMS);
            connection.setRequestProperty("Content-Type", C_CONTENT_TYPE);
            var os = connection.getOutputStream();
            os.write(postData.toString().getBytes());
            os.flush();
        }
        var retorno = connection.getResponseCode();
        if (C_ENCODE != "") {
            var isr = new java.io.InputStreamReader(connection.getInputStream(), C_ENCODE);
        } else {
            var isr = new java.io.InputStreamReader(connection.getInputStream());
        }
        var la = new java.io.BufferedReader(isr);
        var responseString = "";
        var outputString = "";
        while ((responseString = la.readLine()) != null) {
            outputString = outputString + responseString;
        }
        dataset.addColumn("data");
        dataset.addColumn("response_code");
        dataset.addRow(new Array(outputString, retorno));
       
        return dataset;
    } catch (e) {
        dataset.addColumn("error");
        dataset.addRow(new Array(e));
        
        return dataset;
    }
}
