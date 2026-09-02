// Testar JavaScript:
function testarJS(){
    document.getElementById('mensagemJS').innerHTML =
        ' JavaScript executado!';
}

// Carregar JSON:
fetch('/dados/dados.json')
    .then(function(response){
        return response.json();
    })
    .then(function(dados){
        document.getElementById('info-json').innerHTML =
            '<b>Instituição:</b> ' + dados.instituicao + '<br>' +
            '<b>Curso:</b> ' + dados.curso + '<br>' +
            '<b>Semestre:</b> ' + dados.semestre + '<br>' +
            '<b>Dupla:</b> ' + dados.dupla.join(' e ');
    });

// Trocar Video:
function trocarVideo(video){
    var player = document.getElementById('playerVideo');

    player.src = '/video/' + video;
    document.getElementById('nomeVideo').innerHTML = video;

    player.play();
}

// Abrir Imagem
function abrirImagem(imagem){
    var modal = document.getElementById('modalImagem');
    var imgModal = document.getElementById('imgModal');

    imgModal.src = imagem.src;
    modal.style.display = 'flex';
}

// Fechar Imagem:
function fecharImagem(){
    document.getElementById('modalImagem').style.display = 'none';
}