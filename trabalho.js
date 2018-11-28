var padraoTabelasCandidatos = function(candidato) {
    return ' - ' + candidato.nome + ' (' + candidato.partido + ', ' + candidato.votos + ' votos) '
}

var temColigacao = function(candidato) {
    let temOuNao = ''
    if (candidato.coligacao != null)
        temOuNao += '- Coligação:' + candidato.coligacao
    temOuNao += '<br>'

    return temOuNao
}

var leitura = function(linesOfFile) {
    let candidatos = []
    for (let i = 1; i < linesOfFile.length; i++) {
        let line = linesOfFile[i].split(';') //quebra a linha pelo ';'

        //casting dos dados dos candidatos
        if (line[0].includes('*'))
            var eleito = true
        else
            eleito = false

        let nome = line[2]

        let p = line[3].split('-')
        let partido = p[0].trim()
        let coligacao = null
        if (p.length > 1) coligacao = p[1]

        let v = line[4].split('.')
        if (v.length > 1)
            var votos = parseInt((v[0] * 1000)) + parseInt(v[1]) // convertendo a quantidade de votos para inteiros
        else votos = parseInt(v[0])

        candidatos.push({ nome, partido, coligacao, votos, eleito }) //guarda os candidatos em um vetor
    }

    return candidatos
}


var eleitos = function(candidatos) {
    let totalVagas = 0
    let elected = ''
    for (let i = 0; i < candidatos.length; i++) {
        if (candidatos[i].eleito == true) { //caso o candidato foi eleito
            let candidato = candidatos[i]
            elected += (i + 1) + padraoTabelasCandidatos(candidato)
            elected += temColigacao(candidato)

            totalVagas++;
        } else break
    }

    return [totalVagas, elected];
}


var maisVotados = function(candidatos, totalVagas) {
    let mostVoted = ''
    candidatos.sort(function(a, b) { return (b.votos) - (a.votos) })

    for (let i = 0; i < totalVagas; i++) {
        let candidato = candidatos[i]
        mostVoted += (i + 1) + padraoTabelasCandidatos(candidato)
        mostVoted += temColigacao(candidato)
    }

    return mostVoted
}


var seriamPorMajoritario = function(candidatos, totalVagas) {
    let tadinhoDeles = ''
    for (let i = 0; i < totalVagas; i++) {
        let candidato = candidatos[i]
        if (!(candidato.eleito)) {
            tadinhoDeles += (i + 1) + padraoTabelasCandidatos(candidato)
            tadinhoDeles += temColigacao(candidato)
        }
    }

    return tadinhoDeles
}


var eleitosPorBeneficio = function(candidatos, totalVagas) {
    let sortudos = ''
    for (let i = totalVagas; i < candidatos.length; i++) {
        let candidato = candidatos[i]
        if (candidato.eleito) {
            sortudos += (i + 1) + padraoTabelasCandidatos(candidato)
            sortudos += temColigacao(candidato)
        }
    }

    return sortudos
}


var totalVotosNominais = function(candidatos) {
    let totalVotos = 0

    candidatos.forEach(candidato => {
        totalVotos += candidato.votos
    });

    return totalVotos;
}


var openFile = function(event) {
    var input = event.target.files;

    Object.keys(input).forEach(file => {
        var reader = new FileReader();
        reader.readAsText(input[file]);
        reader.onload = function() {
            var text = reader.result;
            text = text.trim(); //retirando os espaços do final do texto para não ter linhas vazias no momento do split
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
            var vagas = e[0];
            var vereadoresEleitos = e[1];

            //total de votos das eleicoes
            var totalVotos = totalVotosNominais(candidatos)

            //candidatos mais votados
            var candidatosMaisVotados = maisVotados(candidatos, vagas)

            //candidatos eleitos caso a eleição fosse majoritária
            var majoritario = seriamPorMajoritario(candidatos, vagas)

            //candidatos eleitos por beneficio
            var beneficiados = eleitosPorBeneficio(candidatos, vagas)

            //saida do programa
            node.innerHTML = 'Numero de vagas: ' + vagas + '<br><br>Vereadores eleitos:<br>' + vereadoresEleitos +
                '<br>Candidatos mais votados (em ordem decrescente de votação e respeitando número de vagas):<br>' +
                candidatosMaisVotados + '<br>Teriam sido eleitos se a votação fosse majoritária, e não foram eleitos:<br>(com sua posição no ranking de mais votados)<br>' +
                majoritario + '<br>Eleitos, que se beneficiaram do sistema proporcional:<br>(com sua posição no ranking de mais votados)<br>' +
                beneficiados + '<br>Total de votos nominais: ' + totalVotos

            $('.saida').css({ display: "block" }); //mostra a caixa de saida na tela
        };
    });
};