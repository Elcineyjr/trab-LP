var openFile = function(event) {
    var input = event.target.files;

    Object.keys(input).forEach(file => {
        var reader = new FileReader();
        reader.readAsText(input[file]);
        reader.onload = function() {
            var text = reader.result;
            var iDiv = document.createElement("div");
            iDiv.setAttribute("id", "file_" + file);
            iDiv.classList.add("saida", "test");
            $('#content').append(iDiv);
            var node = document.getElementById("file_" + file);
            node.innerText = text;
            // $('#output_id').text(text); //Faz exatamente o que as duas linhas acima fazem juntas, porém, por algum motivo está printando tudo sem quebra de linhas
            $('.saida').css({ display: "block" }); //mostra a caixa de saida na tela
            console.log(reader.result.substring(0, 200)); //Só printa isso no console.
        };
    });
};