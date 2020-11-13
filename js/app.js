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


  //verificando se as duas checkbox estão marcadas
  function checkboxValidate(){    
    Termo1 = document.getElementById('termo1');  
    Termo1.addEventListener("invalid",function(){
        this.setCustomValidity('Atenção');
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
        this.setCustomValidity('Atenção');
    });
    Termo2.reportValidity();
    Termo2.addEventListener('change',function(){
        this.setCustomValidity('');
    });
    if(Termo2.checkValidity()){
        return;
    }
   
}

 //verificando se todos os elementos do form estão preenchidos
function validate(){
 
    form = document.getElementById('form');
    reportVal = form.reportValidity();
    if(reportVal == true){
       checkboxValidate();
         getData();
    }
    else{
        return;
    }
}

//obtendo dados
function getData(){
    nome_completo = document.getElementById('Nome').value;
    _Email = document.getElementById('Email').value;
    _CEP = document.getElementById('CEP').value;
    _CPF = document.getElementById('CPF').value;
    _Telefone = document.getElementById('Telefone').value;
    _password = document.getElementById('Senha').value;
    _Confirmpassword = document.getElementById('ConfirmaSenha').value;
    
   Verificar();
    
}


function Verificar(){
    ConfirmarSenha = document.getElementById('ConfirmaSenha');

    if(_password.lenght < 6){
        _password.setCustomValidity("Senha muito fraca!");
        _password.addEventListener('input',function(){
            this.setCustomValidity('');
        });
    }
    
    if(_Confirmpassword!= _password){
        ConfirmarSenha.setCustomValidity("Senhas não coincidem!");
        ConfirmarSenha.addEventListener('input',function(){
            this.setCustomValidity('');
        });
        return;
    }
    Cadastrar(nome_completo,  _CEP, _Email, _Telefone,_CPF);
}

function Cadastrar(nome_completo, _Email, _CEP ,_Telefone, _CPF,){
db.collection(USUARIOS).add({
        Nome: nome_completo,
        Email: _Email,
        CEP: _CEP,
        CPF: _CPF,
        Telefone: _Telefone,
            
     
})
CriarUsuario();   
}

function CriarUsuario(){
    Email = document.getElementById('Email').value;
    password = document.getElementById('Senha').value;
    confirm_password = document.getElementById('ConfirmaSenha').value;
    

auth.createUserWithEmailAndPassword(Email,password).then(user=>{
    console.log(user);
    window.location.href="inicio.html";
}).catch(error =>{
    console.log(error);
})
}

function Login(){

    let userEmail = document.getElementById('campousuario').value;
    let userPassword = document.getElementById('camposenha').value;

    var form = document.getElementById('log_in');
    reportVal = form.reportValidity();
    if(reportVal==true){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>{
        firebase.auth().signInWithEmailAndPassword(userEmail,userPassword).then(loggedUser=>{
           // window.location="inicio.html";
        }).catch(error=>{
            console.log(error)
        })
    }).catch(error=>{
        console.log(error)
    })
    }
    auth.currentUser;

}



  /*db.collection("Usuários").get().then((snapshot)=>{
                        snapshot.forEach((doc)=>{
                            console.log(doc.data());
                        })
  })*/