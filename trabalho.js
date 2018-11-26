var openFile = function(event) {
    var input = event.target.files;

    Object.keys(input).forEach(file => {
        var reader = new FileReader();
        reader.readAsText(input[file]);
        reader.onload = function() {
            var text = reader.result;
            text = text.trim();     //retirando os espaços do final do texto para não ter linhas vazias no momento do split
            var iDiv = document.createElement("div");
            iDiv.setAttribute("id", "file_" + file);
            iDiv.classList.add("saida", "test");
            $('#content').append(iDiv);
            var node = document.getElementById("file_" + file);

            // Criação dos relatórios
            
            let lines = text.split('\n');
            node.innerHTML = 'Numero de vagas: ';
            var eleitos = function() {
                let totalVagas = 0;
                let elected = '';
                for (let i = 1; i < lines.length; i++) {

                    let line = lines[i].split(';');     //divide a linha pelo ';'

                    if(line[0].includes('*')) {     //entra no if se houver o '*' antes do candidato

                        elected += i + ' - ' + line[2];     //adiciona o contador e o nome do candidato na string de saida

                        let partido = line[3].split('-');   //divide a string pelo '-' pra separar partido da coligacao
                        partido[0] = partido[0].trim();     //remove os espacos do inicio e final


                        elected += ' (' + partido[0] + ', ' + line[4] + 'votos)';   //adiciona o partido do cadidato e o numero de votos na string de saida

                        if(partido.length > 1) elected +=  ' - Coligação: ' + partido[1];
                        elected += '<br>';
                        totalVagas++;
                    } else break;
                }
                node.innerHTML += totalVagas + '<br><br>Vereadores eleitos:<br>' + elected + '<br>';
            }

            var maisVotados = function() {
                node.innerHTML += 'Candidatos mais votados (em ordem decrescente de votação e respeitando número de vagas):<br>';
                let ordemVotos = [];
                for (let i = 1; i < lines.length; i++) {

                    let line = lines[i].split(';');
                    let votos = line[4].split('.');
                    let totalVotos = parseInt(votos[0]);    // convertendo a quantidade de votos para inteiros
                    if(votos.length > 1)    // caso o candidato tenha pelo menos de 1000 votos
                        totalVotos = parseInt((votos[0] * 1000)) + parseInt(votos[1]);
                    line[4] = totalVotos;
                    ordemVotos.push(line);
                }
                console.log(ordemVotos);

                node.innerHTML += '<br><br>';
            }
            eleitos();
            maisVotados();

            $('.saida').css({ display: "block" });  //mostra a caixa de saida na tela
        };
    });
};