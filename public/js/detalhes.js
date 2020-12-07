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
var titulo="";
var img ="";
var sobre ="";
var doacoes="";
var mapa="";
var endereco="";
  // (A) GET FROM SESSION
var id = sessionStorage.getItem("id");
function get(){


  // (B) IT WORKS!
  // Session data will perish once tab/window is closed
  // console.log(id); // Foo Bar

  // (EXTRA) TO CLEAR
  sessionStorage.removeItem("KEY");
  // sessionStorage.clear();
}


function loadPage() {
  let ref = db.collection("DadosInstituicoes").doc(id);
  ref.get().then((doc)=>{
    let instituicao = doc.data();
    titulo += "<h1 class='w3-jumbo' id='titulo'>" + instituicao.titulo + "</h1>";
    img += "<img src='" + instituicao.url + "' width='300px' height='250px'>" + "</div>";
    sobre += instituicao.sobre;
    endereco +="Endereço: " + instituicao.endereco;
    for(i = 0; i< instituicao.doacoes_aceitas.length; i++){
      doacoes += "<li>" + instituicao.doacoes_aceitas[i] + "</li>";
    }
    mapa += "<iframe class='' width='90%' height='350' frameborder='0' style='border:0'"
      + "src='https://www.google.com/maps/embed/v1/search?key=AIzaSyDoMTFBhbN4qGiPSVYXCmhZCIqyj7ZgUrw&q="
      + instituicao.endereco  + "' allowfullscreen>" + "</iframe>";
    document.getElementById("titulo").innerHTML = titulo;
    document.getElementById("img").innerHTML = img;
    document.getElementById("sobre").innerHTML = sobre;
    document.getElementById("divSobre").style.visibility = "visible";

    document.getElementById("doações").innerHTML = doacoes;
    document.getElementById("divDoacao").style.visibility = "visible";

    document.getElementById("mapa").innerHTML = mapa;
    document.getElementById("imgMob").innerHTML = img;
    document.getElementById("sobreMob").innerHTML = sobre;
    document.getElementById("doaçõesMob").innerHTML = doacoes;
    document.getElementById("endereco").innerHTML = endereco;
    document.getElementById("mapaMob").innerHTML = mapa;
    document.getElementById("divEnd").style.visibility = "visible";

  });
}
