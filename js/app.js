// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

//Inicializando as configurações do Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyA4A8SDKVgG-s3ZYWtScDk2PnpKEiVkPik",
    authDomain: "donate-39c63.firebaseapp.com",
    databaseURL: "https://donate-39c63.firebaseio.com",
    projectId: "donate-39c63",
    storageBucket: "donate-39c63.appspot.com",
    messagingSenderId: "207937873579",
    appId: "1:207937873579:web:1c761a4ce3e6fda504f9ee",
    measurementId: "G-MFM7QBD1HX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  //Constante com o nome da tabela
  const USUARIOS = "Usuários";


  let db = firebase.firestore();
  let auth = firebase.auth()

  
  var arrObject = [];
  var helper = [];

  //verificando se as duas checkbox estão marcadas
  function checkboxValidate(){    
    Termo1 = document.getElementById('termo1');  
    Termo1.addEventListener("invalid",function(){
        this.setCustomValidity('Você precisa ler e aceitar os termos para prosseguir');
    });
   
    Termo1.reportValidity();
    Termo1.addEventListener('change',function(){
        this.setCustomValidity('');
    });
    if(Termo1.checkValidity()){
        checkboxValidate2();
    }
    
  }

function checkboxValidate2(){
    Termo2 = document.getElementById('termo2');  
    Termo2.addEventListener("invalid",function(){
        this.setCustomValidity('Você precisa ler e aceitar os termos para prosseguir');
    });
    Termo2.reportValidity();
    Termo2.addEventListener('change',function(){
        this.setCustomValidity('');
    });
    if(Termo2.checkValidity()){
        getData();
    }
   
}

 //verificando se todos os elementos do form estão preenchidos
function validate(){
 
    form = document.getElementById('novousuario');
    reportVal = form.reportValidity();
    if(reportVal == true){
       checkboxValidate();
    }
    else{
        return;
    }

}

//obtendo dados
function getData(){
    nome_completo = document.getElementById('campoNome').value;
    _CEP = document.getElementById('campoCEP').value;
    _Email = document.getElementById('campoEmail').value;
    _CPF = document.getElementById('campoCPF').value;
    _Telefone = document.getElementById('campoTelefone').value;
    _password = document.getElementById('campoSenha1').value;
    _Confirmpassword = document.getElementById('campoSenha2').value;
    
    Cadastrar(nome_completo, _Email, _CEP , _Telefone, _CPF);    
}


function Cadastrar(nome_completo, _Email, _CEP ,_Telefone, _CPF,){
  db.collection(USUARIOS).add({
        Nome: nome_completo,
        Email: _Email,
        CEP: _CEP,
        Telefone: _Telefone,
        CPF: _CPF,
})
CriarUsuario();   
}

function CriarUsuario(){
    Email = document.getElementById('campoEmail').value;
    password = document.getElementById('campoSenha1').value;
    confirm_password = document.getElementById('campoSenha2').value;
    

auth.createUserWithEmailAndPassword(Email,password).then(user=>{
    console.log(user);
    limpar();
    window.location.href = "welcome.html";
}).catch(error =>{
    console.log(error);
    if(error.code == "auth/email-already-in-use"){
        alertaEmail();
    }
    else if(error.code == "auth"){

    }
})
}

function alertaEmail(){
    swal("Ocorreu um erro", "Esse email já foi cadastrado!", "error");
}

function limpar(){
   document.getElementById('campoNome').value = "";
   document.getElementById('campoCEP').value = "";
   document.getElementById('campoEmail').value = "";
   document.getElementById('campoCPF').value = "";
   document.getElementById('campoTelefone').value = "";
   document.getElementById('campoSenha1').value = "";
   document.getElementById('campoSenha2').value = "";
}

function Login(){

    let userEmail = document.getElementById('campousuario').value;
    let userPassword = document.getElementById('camposenha').value;

    var form = document.getElementById('log_in');
    reportVal = form.reportValidity();
    if(reportVal==true){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>{
        firebase.auth().signInWithEmailAndPassword(userEmail,userPassword).then(loggedUser=>{
            window.location="Instituicoes.html";
        }).catch(error=>{
            console.log(error)
            if(error.code == "auth/wrong-password"){
                alertaUsuario();
            }
            else if(error.code == "auth/invalid-email"){
                alertaUsuario2();
            }
            else if(error.code == "auth/user-not-found"){
                alertaUsuario3();
            }
            else if(error.code == "auth/too-many-requests"){
                alertaUsuario4();
            }
        })
    }).catch(error=>{
        console.log(error)
    })
    }
}

function LoginAnonimo(){
  
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>{
        firebase.auth().signInAnonymously().then(loggedUser =>{
            window.location="Instituicoes.html";
        }).catch(function(error){
    console.log(error)
        })
    }).catch(error=>{
        console.log(error)
    })
}

function alertaUsuario(){
    swal("Usuário ou senha inválida", "Insira um usuário e senha válida e tente novamente", "error");
}
function alertaUsuario2(){
    swal("Endereço de email inválido", "Insira um endereço de email válido e tente novamente", "error");
}
function alertaUsuario3(){
    swal("Usuário não cadastrado", "Gostaria de se registrar?", "error");
}

function alertaUsuario4(){
    swal("Muitas tentativas", "Aguarde alguns minutos e tente novamente", "error");
}

function recuperarSenha(){
var auth = firebase.auth();
var emailAdress = document.getElementById('campousuarioRecuperar').value;

auth.sendPasswordResetEmail(emailAdress).then(()=>{
alertaRecuperarSenha();
}).catch(error=>{
    console.log(error);
})
}

function alertaRecuperarSenha(){
    swal({
        title: "Sucesso!",
        text: "Um email para redefinição de senha foi enviado!",
        icon: "success",
        timer: 5500
        });
        setTimeout(redirecionar, 5500);
    }
function redirecionar() {
    window.location.href = "login.html";
}


  /*db.collection("Usuários").get().then((snapshot)=>{
                        snapshot.forEach((doc)=>{
                            console.log(doc.data());
                        })
  })*/