
var mensagem = document.getElementById('err_localizacao');
var divMensagem = document.getElementById('divErr');
var btn = document.getElementById('btn_err');

var _latitude;
var _longitude;
var locationObject = {};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    alert("liga sapora")
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showError(error) {

  switch(error.code) {
    case error.PERMISSION_DENIED:
      mensagem.innerHTML = "Parece que você negou o acesso a localização :( <br> clique no botão abaixo para permitir";
      divMensagem.style.display = "block";
      btn.style.display = "block";
      break;
    case error.POSITION_UNAVAILABLE:
      mensagem.innerHTML = "A sua localização está indisponível :("
      divMensagem.style.display = "block";
      break;
    case error.TIMEOUT:
      mensagem.innerHTML = "The request to get user location timed out."
      divMensagem.style.display = "block";
      break;
    case error.UNKNOWN_ERROR:
      mensagem.innerHTML = "An unknown error occurred."
      divMensagem.style.display = "block";
      break;
  }
}
getLocation();

function showPosition(position) {
   _latitude = position.coords.latitude;
   _longitude = position.coords.longitude;
    locationObject = {
    latitude: _latitude, 
    longitude: _longitude,
 }
   doSomeActions();
}
function doSomeActions(){
   
  if(divMensagem.style.display = "block"){
    divMensagem.style.display = "none";
    btn.style.display = "none";
  }


db.collection("Instituições").get().then((snapshot)=>{
    
    snapshot.forEach((doc) =>{
      let instituicao = doc.data();
     helper.push({nome: instituicao.nome, desc: instituicao.desc, 
    latitude: instituicao.latitude, longitude: instituicao.longitude, 
     url: instituicao.url});
          //  console.log(instituicao);
    })
 pegarDadosInstituicao(); 
})
}
function pegarDadosInstituicao(){
    for(i=0; i<helper.length;i++){
 arrObject.push({nome: helper[i].nome, desc: helper[i].desc, 
    latitude: helper[i].latitude, longitude: helper[i].longitude, url: helper[i].url});
}
doSomeMoreActions();

}  

  function doSomeMoreActions(){

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {

   const R = 6371e3; // metres
   const φ1 = lat1 * Math.PI/180; // φ, λ in radians
   const φ2 = lat2 * Math.PI/180;
   const Δφ = (lat2-lat1) * Math.PI/180;
   const Δλ = (lon2-lon1) * Math.PI/180;

const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
          
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

const d = (R * c) / 1000; // em quilômetros
   return d;  // distance returned
}
function deg2rad(deg) {
   return deg * (Math.PI/180)
}

//getDistanceFromLatLonInKm();


for(let i = 0; i<arrObject.length; i++) {
   let distance = getDistanceFromLatLonInKm(locationObject.latitude, 
   locationObject.longitude,arrObject[i].latitude,
   arrObject[i].longitude); 
   //Attaching returned distance from function to array elements
   arrObject[i].distance = distance;
}
//console.log(arrObject); // [{... distance: ...}]    

arrObject.sort(function(a, b) {
   return a.distance - b.distance
});

var html = "";
var _id;



for (let i = 0; i<arrObject.length; i++) {
    _id = arrObject[i].nome;
    html += "<div class='rect w3-cell w3-center w3-hover-shadow w3-hover-white'>" 
    + "<h2>" + arrObject[i].nome + "</h2>" + "<img src='" + arrObject[i].url 
    + "' width='150px' height='150px'>" + "<br>" + "<p>" 
    + arrObject[i].desc + "</p>" 
    + "<p>" + "A " + arrObject[i].distance.toFixed(1) 
    + "km de você" + "</p>";
  html += "<label for='"+ _id + "' class='w3-button w3-black' style='margin-top:10%'>" + "Detalhes" + "</label>";
  html += "<input type='checkbox' class='w3-button w3-black' style='display: none' id='" + _id + "'>" + "</input>";
  html +=  "</div>";
}


document.getElementById('teste').innerHTML = html;

var inputsRadio = document.getElementsByTagName("input");

// percorre os elementos para associar function ao evento change
for (var i = 0; i < inputsRadio.length; i++) {
  inputsRadio[i].addEventListener("change", detalhes);
}

function detalhes(){
   for (var i = 0; i < inputsRadio.length; i++) {
    if (inputsRadio[i].checked) {    // se selecionado... 
      var selecao = i;               // armazena índice do radio selecionado
      inputsRadio[i].checked = false;
      var nomeInstituicao = arrObject[i].nome;
      store(nomeInstituicao);
      break;                         // e sai da repetição  
    }
  }
}

function store(id){

  //variável a ser passada
  var idInstituicao = id;


  // SAVE TO SESSION STORAGE
    // sessionStorage.setItem("KEY", "VALUE");
  sessionStorage.setItem("id", idInstituicao);

  //Redireciona para a página "detalhes"
   location.href="detalhes.html";

}

}