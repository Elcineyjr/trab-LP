
var openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function() {
        var text = reader.result;
        var node = document.getElementById('output');
        node.innerText = text;
        $('.hide').css({display:'block'});  //mostra a caixa de saida na tela
        console.log(reader.result.substring(0, 200));
    };
    reader.readAsText(input.files[0]);
};