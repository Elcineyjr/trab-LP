var leitura = function(linesOfFile) {
    let candidatos = []
    for (let i = 1; i < linesOfFile.length; i++) {
        let line = linesOfFile[i].split(';') //quebra a linha pelo ';'

        //casting dos dados dos candidatos
        if(line[0].includes('*'))
            var eleito = true
        else
            eleito = false

        let nome = line[2]

        let p = line[3].split('-')
        let partido = p[0].trim()
        let coligacao = null
        if(p.length > 1) coligacao = p[1]

        let v = line[4].split('.')
        let votos = parseInt(v[0] + v[1]) // convertendo a quantidade de votos para inteiros

        candidatos.push({nome, partido, coligacao, votos, eleito}) //guarda os candidatos em um vetor
    }
    console.log(candidatos) //printa todos os candidatos no console
    return candidatos
}


var eleitos = function(candidatos) {
    let totalVagas = 0
    let elected = ''
    for (let i = 0; i < candidatos.length; i++) {
        let cont = i + 1
        if(candidatos[i].eleito == true) {     //caso o candidado foi eleito
            let candidato = candidatos[i]
            if(candidato.coligacao != null)   //caso tenha 
                elected += cont + ' - ' + candidato.nome + '(' + candidato.partido + ', ' + candidato.votos + ' votos) ' + '- Coligação:' + candidato.coligacao + '<br>'
            else
                elected += cont + ' - ' + candidato.nome + '(' + candidato.partido + ', ' + candidato.votos + ' votos) ' + '<br>'
            
            totalVagas++;
        } else break
    }

    return [totalVagas, elected];
}


//var maisVotados = function(candidatos){}  //  TODO



var totalVotosNominais = function(candidatos){
    let totalVotos = 0 
    for(let i = 0; i < candidatos.length; i++)
        totalVotos += candidatos[i].votos
    
    return totalVotos;
}

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

            //vetor com todas as linhas do arquivo
            let lines = text.split('\n');

            //vetor de candidatos
            var candidatos = leitura(lines)
            
            //candidatos eleitos e numero de vagas
            var e = eleitos(candidatos);
            var vereadoresEleitos = e[0];
            var vagas = e[1];

            //total de votos das eleicoes
            var totalVotos = totalVotosNominais(candidatos)

            //TODO candidatos mais votados
            
            //saida do programa
            node.innerHTML = 'Numero de vagas: ' + vereadoresEleitos + '<br><br>Vereadores eleitos:<br>' + vagas + '<br>' + 'Total de votos nominais: ' + totalVotos

            $('.saida').css({ display: "block" });  //mostra a caixa de saida na tela
        };
    });
};


