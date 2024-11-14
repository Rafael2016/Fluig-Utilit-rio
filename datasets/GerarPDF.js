function gerarPdf(strHtml) {
	try {
		// Importa as classes
		importClass(Packages.com.itextpdf.text.Document);
		importClass(Packages.com.itextpdf.text.PageSize);
		importClass(Packages.com.itextpdf.text.Rectangle);
		importClass(Packages.com.itextpdf.text.pdf.PdfWriter);
		importClass(Packages.com.itextpdf.tool.xml.XMLWorkerHelper);
		importClass(Packages.java.io.ByteArrayOutputStream);
		importClass(Packages.java.util.Base64);

		// Define as dimensões da página para o tamanho A4
		var pageSize = new Rectangle(PageSize.A4);
		
		// Cria um novo documento com as dimensões da página A4 e margens de 36 pontos
		var document = new Document(pageSize, 36, 36, 36, 36);

		// Cria um novo stream de saída para capturar o conteúdo do PDF
		var byteArrayOutputStream = new ByteArrayOutputStream();

		// Cria o arquivo PDF
		var writer = PdfWriter.getInstance(document, byteArrayOutputStream);

		// Abre o documento para escrita
		document.open();

		// Converte a string HTML em um array de bytes 
		var is = new java.io.ByteArrayInputStream(new java.lang.String(strHtml).getBytes());
		
		// Converter o HTML em PDF
		XMLWorkerHelper.getInstance().parseXHtml(writer, document, is);

		// Fecha o documento
		document.close();

		// Codifica o conteúdo do PDF em base64 e o retorna como uma string
		var pdfAsBase64 = Base64.getEncoder().encodeToString(byteArrayOutputStream.toByteArray());

		return pdfAsBase64;

	} catch (ex) {
		
		throw "function " + arguments.callee.name + " => " + ex.toString() +", LINE: " + ex.lineNumber 
	}
}