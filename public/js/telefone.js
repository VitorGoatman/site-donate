function validaTelefone(){
    const telefoneRegra = new RegExp(/(\(?\d{2}\)?)?(\d{4,5}\d{4})/);
    let telefone = document.getElementById('campoTelefone').value;
    var test = telefoneRegra.test(telefone);
    if(!test){
        swal('Ocorreu um erro', 'Insira um telefone válido!', 'error');
    }
}
