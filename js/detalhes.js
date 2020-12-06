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
  const INSTITUICOES = "Instituições";

  const storage = firebase.storage;

  let db = firebase.firestore();
  let auth = firebase.auth();

  var html="";

  // (A) GET FROM SESSION
  var id = sessionStorage.getItem("id");
    function get () {


  // (B) IT WORKS!
  // Session data will perish once tab/window is closed
 // console.log(id); // Foo Bar

  // (EXTRA) TO CLEAR
   sessionStorage.removeItem("KEY");
   sessionStorage.clear();
  } 


function loadPage() {
  let ref = db.collection("DadosInstituicoes").doc(id);
ref.get().then((doc)=>{ 
        let instituicao = doc.data();
        console.log(id)
        //console.log(instituicao.titulo)
         //html += instituicao.titulo;
        html += "<div class='' style='padding-top: 1em; text-align: center;'>" + "<h1 id='titulo' class='w3-jumbo'>" + instituicao.titulo + "</h1>" + "</div>";
        html += "<div class='container'>" + "<div class='rect r1'>" + "<img src='" + instituicao.url  
                + "' width='100%' height='100%'>" + "</div>";  
        html += "<div class='rect r2'>" + "<h3> Sobre a ONG: </h3>";
        html += "<p>" + instituicao.sobre + "</p>" + "</div>";
        html += "<div style='padding-top: 1em; text-align: center;'>";
        html += "<h1>Doações aceitas</h1>";    
        for(i = 0; i< instituicao.doacoes_aceitas.length; i++){
            html += "<p>" + instituicao.doacoes_aceitas[i] + "</p>";
        }
        html += "</div>";
        html += "</div>";
     /*   html += 
        html += 
        html += 
        html += 
*/
          //  console.log(instituicao);
document.getElementById("teste").innerHTML = html;
    }); 
}


