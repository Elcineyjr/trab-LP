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
        if(v.length > 1)
            var votos = parseInt((v[0] * 1000)) + parseInt(v[1]) // convertendo a quantidade de votos para inteiros
        else votos = parseInt(v[0])

        candidatos.push({nome, partido, coligacao, votos, eleito}) //guarda os candidatos em um vetor
    }
    // console.log(candidatos) //printa todos os candidatos no console
    return candidatos
}


var eleitos = function(candidatos) {
    let totalVagas = 0
    let elected = ''
    for (let i = 0; i < candidatos.length; i++) {
        let cont = i + 1
        if(candidatos[i].eleito == true) {     //caso o candidado foi eleito
            let candidato = candidatos[i]
            elected += cont + ' - ' + candidato.nome + '(' + candidato.partido + ', ' + candidato.votos + ' votos) '
            if(candidato.coligacao != null)   //caso tenha coligacao
                elected += '- Coligação:' + candidato.coligacao
            elected += '<br>'
            
            totalVagas++;
        } else break
    }

    return [totalVagas, elected];
}


var maisVotados = function(candidatos, totalVagas) {
    let mostVoted = ''
    candidatos.sort(function(a, b) { return (b.votos) - (a.votos) })
    //candidatos.forEach(c => {
    //    console.log(c.votos)
    //}); 
    

    //mostVoted += 'Candidatos mais votados (em ordem decrescente de votação e respeitando número de vagas):<br>'
    for(let i = 0; i < totalVagas; i++) {
        mostVoted += (i+1) + ' - ' + candidatos[i].nome + ' (' + candidatos[i].partido + ', ' + candidatos[i].votos + ' votos) '
        if(candidatos[i].coligacao != null)   //caso tenha coligacao
            mostVoted += '- Coligação:' + candidatos[i].coligacao
        mostVoted += '<br>'
        //console.log(i)
    }

    return mostVoted
}



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

            //candidatos mais votados
            var candidatosMaisVotados = maisVotados(candidatos, vagas);
            
            //saida do programa
            node.innerHTML = 'Numero de vagas: ' + vereadoresEleitos + '<br><br>Vereadores eleitos:<br>' + vagas + '<br>' + 'Candidatos mais votados (em ordem decrescente de votação e respeitando número de vagas):<br>'+ candidatosMaisVotados + 'Total de votos nominais: ' + totalVotos

            $('.saida').css({ display: "block" });  //mostra a caixa de saida na tela
        };
    });
};


