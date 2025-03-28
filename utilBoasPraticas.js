//Methodo Assign - Juntar 2 objetos

const obj1 = {a:1 ,b:2};
const obj2 = {b: 4, e:5, a:2};
const novo = Object.assign({}, a , d));
console.log(novo);

//Map,Reduce e filter
dados = [{
    nome:'Bill', idade:3, especie:'dog'},{
    nome:'Rex', idade:10, especie:'dog'},{
    nome:'Fiona', idade:10, especie:'cat'
}];
let dogs        = dados.filter((dado)=> dado.especie ==='dog');
let idadeReal   = dogs.map((dog)=>({nome:dog.nome, idade:dog.idade * 7}));
console.log(dogs);
console.log(idadeReal); 

// ###INTERANDO OBJETO JSON DE FORMA DINAMICA,SEM SABER AS PROPRIEDADES
		//Objeto JSON	
for(key in data){	
	//Pega as chaves do objeto
    if(typeof data[key] !=='object'){
    
        console.log("Chave: " + key + " - Valor: " + data[key]);

    }else{
    	//Loop para pegar os valores
        data[key].forEach(function(value) {
	      for (key2 in value) {
	        console.log("Chave: " + key2 + " - Valor: " + value[key2]);
	      }
    }); 


    }

}

//## Validação Vázio atribuição

var a = undefined;

var b = a != undefined ? a : 'vazia';
console.log(a);

//## namespace POO 

var dados = (function)

//## Gerar elemento HTML

const element        = document.getElementById('container-justificativa');
        const div            = document.createElement('div');
        
        div.innerHTML      = `<div class="jumbotron jumbotron-fluid" id="box-just-`+atividade+`">
                                <div class="container">
                                <div class="col-sm-2 col-md-2 col-xs-6">
                                    <div class="form-group">
                                        <label for="justificativaChapa">Chapa</label>
                                        <input type="text" class="form-control" name="justificativaChapa_`+
                                        atividade+`" id="justificativaChapa_`+atividade+`">
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="justificativaNome">Nome</label>
                                        <input type="text" class="form-control" name="justificativaNome_`+atividade+`" id="justificativaNome_`+atividade+`">
                                    </div>
                                </div>
                                <div class="col-sm-4 col-md-4 col-xs-6">
                                    <div class="form-group">
                                        <label for="nivel">Nível Processo</label>
                                        <input type="text" class="form-control" name="nivel_`+atividade+`" id="nivel_`+atividade+`">
                                    </div>
                                </div>
                                <div class="col-md-12 col-sm-12">
                                    <label for="justificativ" class="control-label">
                                        <strong>Justificativa:</strong>
                                    </label>
                                    <textarea class="form-control" name="justificativa_`+atividade+`" cols="50" rows="5">                                                
                                    </textarea>
                                </div>
                            </div>`;

        element.appendChild(div);

//### SPLIT seperar string

//## O separador também pode ser uma expressão regular.

var names = 'Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand ';
names.split(/\s*;\s*/)

 

 //Moeda Local 
 parseFloat(sd).toLocaleString("pt-BR", { style: "currency" , currency:"BRL"});

/* ##Pegar data da tag */

var idCentro = htmlElement.getAttribute('data-modal');

/* ## Somar Valores do CheckBox selecionados */

 $('.ted').change(function (e) {
            var total = $('input[class="ted"]:checked').get().reduce(function (tot, el) {
                let numberf = el.getAttribute('data-valor').toString().replace('.', '').replace(',', '.');
                return (parseFloat(tot) + parseFloat(numberf)).toFixed(2);
            }, 0);

            $('#vlrTotal').val(moneyBr(total));
        });
/* ## setTimeoutTimeout, SetInterval */

const mostrar = () =>{
    alert('SetTimeout');
};
setTimeout(mostrar, 3000);

const testeInterval = setInterval (() => {console.log('Teste');},1000);
/*Cancela setInterval*/ 
setTimeout(()=>{clearInterval(testeInterval)},1000);

/* ###Factories(Fábrica de Objeto)*/
const Mamifero = function(nome, som) {
   return {nome ,som};
};

/*TEXTAREA EXPANDIR TAMANHO DO TEXTO*/
setTimeout(function () {

       var txtarea = document.querySelector("textarea.form-control");
       txtarea.style.height = txtarea.scrollHeight+"px";        
                
}, 100);

/*FECTH CHAMADA AJAX */

$('elemento').on('click', async function(){

	var response = await fetch('URL CHAMADA');
        var jsonData = await response.json();
	
  	/*Iterando retorno Loop*/
	jsonData.map(value =>{
		console.log(value)
  	})		

});

/* UPLOAD ARQUIVO */

$('input[type="file"]').change(function(e){
            var fileName = e.target.files[0].name;
            alert('The file "' + fileName +  '" has been selected.');
        });
/* VERIFICAR SE ELEMENTO EXISTE EM UMA STRING*/
let frase = 'Rafael luz o maior'
console.log(frase.includes('luz'))
/**TRANSFORMA CADEIA DE STRING EM ARRAY */
let word = 'Rafael'
console.log(Array.from(word))

/* TRANFORMA ARRAY MULTINIVEIS EM ARRAY SIMPLES FLAT*/
const  idade = [20,34,[35,60,[70,80]]];
idade.flat(2); 

/* TRANFORMA ARRAY EM STRING */

['a', 'b', 'c'].toString(); // 'a,b,c'


/**
 * PROIBI NUMEROS NEGATIVOS IMPUT 
 */
oninput="validity.valid||(value='');"


/**
 * FORMATAR DATA
 */

let data_americana = "2020-12-30";
let data_brasileira = data_americana.split('-').reverse().join('/');



const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3'
];


/**
 * CHAMA PROMISE ALL 
 */
async function getTodos() {
  const promises = urls.map(async (url, idx) => 
    console.log(`Received Todo ${idx+1}:`, await fetch(url))
  );

  await Promise.all(promises);

  console.log('Finished!');
}

/**
 * TOOGLE JAVACRIPT
 * 
 */

resetSenha=(event)=>{

    document.getElementById("section-dados").classList.remove("hide")
    
    // Toggle
    $formResenha = document.getElementById("form-recuperaSenha")

    if($formResenha.classList.contains("hide")){
        $formResenha.classList.remove("hide")
       
    }else{
        $formResenha.classList.add("hide")
    }
    
 }


 // REMOVE EMOJI DOS CARACTERES EXPRESSÃO REGULAR
 let x = '🖐️ Post Test'
 x = x.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
console.log(x)


/// PREENCHENDO  FORMULARIO FLUIG 
parent.WCMAPI.Create({ 
        url: '/api/public/2.0/cards/create', 
        data: JSON.stringify(
            { 
                "parentDocumentId": 17213,
                "version": 1000, 
                "formData": [ 
                    { 
                        "name": "dTitle", 
                        "value": "rafael Teste" 
                    }, 
                    { 
                        "name": "dAuthor", 
                        "value": "Rafael Luz"
                    }
                ]
            }),
        
            success: function(data){
                FLUIGC.toast({
                    title:'Aviso',
                    message:'Documento adicionado aos Prioritários',
                    type:'info'
                });

            console.log(data)
        },
        error: function(error){
           console.error(error)
        }
    });


// FETCH 
// dados a serem enviados pela solicitação POST
let _data = {
  title: "foo",
  body: "bar", 
  userId:1
}

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: "POST",
  body: JSON.stringify(_data),
  headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json()) 
.then(json => console.log(json));
.catch(err => console.log(err));


let resLocalidades = await fetch(`${_ENDPOINT}integracao_fluig/ramais/localidades/listar`, {
            method: "GET",
            headers: {
                "client_id": _CLIENT_ID,
                "access_token":_ACCESS_TOKEN,
                "Content-Type": "application/json"
            }
        }).then((res) => res.json())

        if (isEmpty(resLocalidades)) {
            self.messageToast("Erro", "Erro ao buscar localidades", "warning")
            console.error(resLocalidades)
            return false
        }

        return resLocalidades


/***
 *@GERANDO TOKEN 
 */ 

Math.random().toString(30).substr(2)

/**
 * @SELECIONAR RADIO BUTTON 
 */

let valueButton = document.querySelector("input[name='tipoContaPj']:checked").value

/**
 * @DEBUGAR ARRAY OBJETOS
 */

let data = [{nome:'Rafael Gomes',idade:38},{nome:'Bethy',idade:37}]

console.log(JSON.stringify(data,null,2))


/**
 * @CONVERT ARQUIVO EM BASE64
 */

const convertToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

//Pegar input com arquivo
const file = document.querySelector('#myfile').files[0];
const convertedFile = await convertToBase64(file)

/**
 * @CONVERT STRING  EM BASE64
 */
var string = 'DevPleno'

// Convertendo para Base64
var emBase64 = btoa(string)
 
// Voltando para string
var deBase64 = atob(emBase64)
console.log(deBase64)  


//pegar 1º ocorrencia de uma string separado por espaço
let  [, cepTipoRua]  = dsCep.values[0]["ds_end"].match(/(\S+) /) || [];


// Verificar Item de maior resindencia Array

let arrayEleme = [1,1,1,1,2,2,2,2,2,2,2,2,1,2,1,2,1,1,4,4,4,4,4,4]

let elem = arrayEleme.reduce((previous,current,index,arr)=>{


    if(arr.filter(el => el === previous).length > arr.filter(el => el === current).length){

        return previous
    }else{

        return current 
    }

    
})


// GERAR INSERT TABELA 

function gerarInsert(funcionarios) {
    const colunas = Object.keys(funcionarios[0]);
    let valores = funcionarios.map(funcionario => {
        return colunas.map(coluna => {
            let valor = funcionario[coluna];
            // Trata valores nulos e datas
            if (valor === null || valor === "null" || valor === "undefined" || valor === "N/A") {
                return 'NULL';
            } else if (coluna === "DATAADMISSAO" || coluna === "DTNASCIMENTO") {
                return `'${valor.split('T')[0]}'`;
            } else {
                return `'${valor}'`;
            }
        }).join(', ');
    }).join('),\n(');

    console.log(`INSERT INTO gestao_usuario (${colunas.join(', ')}) VALUES\n(${valores});`);
}

let  sql = `SELECT * FROM gestao_usuario WHERE CODSITUACAO = "A" AND NOME_FILIAL <> "EMBRACON ADMINISTRADORA DE CONSORCIO LTDA" ;`

    let  ds = DatasetFactory.getDataset('ds_executa_query_consulta' ,[sql], null, null);

gerarInsert(ds.values)  

//# BUSCA DADOS USUÁRIOS E OS PAPEIS 

let param = [
    DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST),
   
]

let ds = DatasetFactory.getDataset("colleague ", null, param, null).values

ds.forEach(user=>{

let param1 = [
DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", user["colleaguePK.colleagueId"], 
user["colleaguePK.colleagueId"], ConstraintType.MUST)
]

let dsRole = DatasetFactory.getDataset("workflowColleagueRole", null, param1, null).values

if(dsRole.length <= 0){
console.log(`COLABORADOR: ${user.colleagueName} - Email:${user.mail}`)
}
})

// ATUALIZADO VERSÃO DO FORMULARIO DA SOLICITAÇÃO

let sql = `UPDATE DOCUMENTO
	 SET NUM_VERS_PROPRIED= "6000"
	 WHERE 
	 NR_DOCUMENTO = "462678"  ` 

let  ds = DatasetFactory.getDataset('dsGenericExecuteSQL' ,['DML', sql], null, null);
ds 
>>>>>>> 38788af396e07634a63ac2627af66ba5a3ec12d1