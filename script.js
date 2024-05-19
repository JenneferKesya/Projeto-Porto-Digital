const tempoAtual = document.getElementById('tempoAtual');
const tempoTotal = document.getElementById('tempoTotal');
const buttonPlay = document.getElementById('play');
const buttonPause = document.getElementById('pause');
const buttonVoltar = document.getElementById('voltar');
const buttonAvancar = document.getElementById('avancar');
const progressBar = document.getElementById('progressBar');

const informacoesMusicas = [
    { caminho: './Music/Eternamente.mp3', foto: './Pictures/Gal.jpg', titulo: 'Eternamente', cantor: 'Gal Costa' },
    { caminho: './Music/Olhos-castanhos.mp3', foto: './Pictures/olhos.jpg', titulo: 'Olhos Castanhos', cantor: 'Geovanna Jainy' },
    { caminho: './Music/vejo-em-fim.mp3', foto: './Pictures/soThis.jpg', titulo: 'Vejo enfim a luz brilhar', cantor: 'Sylvia Salustti e Raphael Rossato' }
];

let musicaAtualIndex = 0;
let music = new Audio(informacoesMusicas[musicaAtualIndex].caminho);
let interval;

function carregarMusica(index) {
    music.src = informacoesMusicas[index].caminho;
    document.getElementById('fotoMusica').src = informacoesMusicas[index].foto;
    document.getElementById('tituloMusica').textContent = informacoesMusicas[index].titulo;
    document.getElementById('cantorMusica').textContent = informacoesMusicas[index].cantor;
    music.addEventListener('loadedmetadata', function () {
        tempoTotal.textContent = formatarTempo(music.duration);
    });
    tempoAtual.textContent = formatarTempo(0);
    progressBar.value = 0;
}

function togglePlayPause() {
    buttonPlay.classList.toggle('hide');
    buttonPause.classList.toggle('hide');
    if (music.paused) {
        music.play();
        interval = setInterval(updateMusicTime, 1000);
    } else {
        music.pause();
        clearInterval(interval);
    }
}

function updateMusicTime() {
    tempoAtual.textContent = formatarTempo(music.currentTime);
    const progresso = (music.currentTime / music.duration) * 100;
    progressBar.value = progresso;
}

function formatarTempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
}

function avancar() {
    musicaAtualIndex = (musicaAtualIndex + 1) % informacoesMusicas.length;
    carregarMusica(musicaAtualIndex);
    togglePlayPause();
}

function voltar() {
    musicaAtualIndex = (musicaAtualIndex - 1 + informacoesMusicas.length) % informacoesMusicas.length;
    carregarMusica(musicaAtualIndex);
    togglePlayPause();
}

buttonPlay.addEventListener('click', togglePlayPause);
buttonPause.addEventListener('click', togglePlayPause);
buttonAvancar.addEventListener('click', avancar);
buttonVoltar.addEventListener('click', voltar);

progressBar.addEventListener('input', function () {
    music.currentTime = (progressBar.value / 100) * music.duration;
});

carregarMusica(musicaAtualIndex);

