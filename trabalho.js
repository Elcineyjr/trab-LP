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
            
            // Criação dos relatórios
            var lines = text.split('\n');
            var totalVagas = 0;
            var elected = '';
            node.innerHTML = 'Numero de vagas: ';
            for (let i = 1; i < lines.length; i++) {
                let line = lines[i].split(';'); //divide a linha pelo ';'

                if(line[0].includes('*')) { //entra no if se houver o '*' antes do candidato

                    elected += i + ' - ' + line[2]; //adiciona o contador e o nome do candidato na string de saida

                    let partido = line[3].split('-'); //divide a string pelo '-' pra separar partido da coligacao
                    partido[0] = partido[0].trim(); //remove os espacos do inicio e final

                    elected += ' (' + partido[0] + ', ' + line[4] + ' votos) '; //adiciona o partido do cadidato e o numero de votos na string de saida

                    if(partido.length > 1) elected +=  '- Coligação: ' + partido[1]; //se o partido tiver coligacoes
                    elected += '<br>';
                    totalVagas++;
                } else break;
            }
            node.innerHTML += totalVagas + '<br><br>Vereadores eleitos:<br>';
            node.innerHTML += elected;
            $('.saida').css({ display: "block" }); //mostra a caixa de saida na tela
        };
    });
};