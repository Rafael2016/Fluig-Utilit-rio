/**
 * Realizar Upload Planilha via console navegador para importa Registros 
 */
document.getElementById('fileInput').addEventListener('change', readerFile, false);

async function addRegistro(dados){
    console.log(`addRegistro`)
    dados.forEach(function(value) {
     console.log(`addRegistro value`,value)
        let dadosForm ={
            "values": [
                {
                    "fieldId": "cargo",
                    "value": value[1]
                },
                {
                    "fieldId": "codCargo",
                    "value":value[0]
                },
                {
                    "fieldId": "codColigada",
                    "value": "1"
                },
                
                {
                    "fieldId": "coligada",
                    "value": "1 - EMPRESA 01"
                },
                {
                    "fieldId": "descritor",
                    "value": `${value[0]}- ${value[1]}`
                }
                ]
            }

            let param  = [
                DatasetFactory.createConstraint("IDFORMULARIO", 256584, 256584 , ConstraintType.MUST),
                 DatasetFactory.createConstraint("CAMPOS", JSON.stringify(dadosForm), JSON.stringify(dadosForm) , ConstraintType.MUST)
            ]
            let ds = DatasetFactory.getDataset('dsAddRegisterForm' ,null, param, null);
            
             console.log(`addRegistro dsAddRegisterForm`, ds.values)

    })
}

   async function readerFile(event) {
        console.log(event)
        let resultado = null 
        
        let files = event.target.files;
        if (files.length === 0) {
            console.error('No file selected!');
            return;
        }
       
        let file = files[0];
        let reader = new FileReader();
        reader.onload = async function(e) {
            
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, {type: 'array'});
            let firstSheetName = workbook.SheetNames[0];
            let  worksheet = workbook.Sheets[firstSheetName];
            let json = XLSX.utils.sheet_to_json(worksheet, {header: 1});
             await addRegistro(json)
        };
        reader.onerror = function(error) {
            console.error('Error reading file:', error);
        };
        reader.readAsArrayBuffer(file);
      
        
    }