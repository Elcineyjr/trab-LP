<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Teste de script de leitura de arquivos locais</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />

    <script type="text/javascript" src=trabalho.js></script>
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col col-xs-2 "></div>
            <!-- Div acima usada somente pra manter tudo alinhando no meio, comentar essa linha se quiser que se alinhe com a esquerda mesmo-->
            <div class="col col-xs-8" id="content">
                <h1>Trabalho de Linguagens de Programação</h1>
                <h3>Selecione o arquivo de entrada: <input type='file' multiple accept='.csv' onchange='openFile(event)'><br></h3>
                <p class="saida" id="teste">Saida:</p>
                <!-- <div class="saida test "></div> -->
            </div>
            <div class="col col-xs-2"></div>
            <!-- Div acima usada somente pra manter tudo alinhando no meio, comentar essa linha se quiser que se alinhe com a esquerda mesmo-->
        </div>
    </div>
</body>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

</html>
