// A lógica do jogo (matriz, funções de vitória, etc.) deve ser mantida aqui
let tabuleiro = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let jogadorAtual = 'X';
let jogoAtivo = true;

const mensagem = document.getElementById('mensagem');
const celulas = document.querySelectorAll('.celula');
const botaoReiniciar = document.getElementById('reiniciar');

// 1. Configura os eventos de clique nas células
celulas.forEach(celula => {
    celula.addEventListener('click', aoClicarCelula);
});

// 2. Configura o evento de clique no botão Reiniciar
botaoReiniciar.addEventListener('click', reiniciarJogo);

// --- Funções de Lógica ---

function aoClicarCelula(evento) {
    const celulaClicada = evento.target;
    const linha = parseInt(celulaClicada.dataset.linha); // Pega o valor do HTML
    const coluna = parseInt(celulaClicada.dataset.coluna);

    // Checa se o jogo está ativo e se a célula está vazia
    if (!jogoAtivo || tabuleiro[linha][coluna] !== '') {
        return;
    }

    // Atualiza o estado lógico e visual
    tabuleiro[linha][coluna] = jogadorAtual;
    celulaClicada.textContent = jogadorAtual; 

    if (verificarVencedor(tabuleiro, jogadorAtual)) {
        mensagem.textContent = `Parabéns! O Jogador ${jogadorAtual} VENCEU!`;
        jogoAtivo = false;
        return;
    }

    if (verificarEmpate(tabuleiro)) {
        mensagem.textContent = "Fim do jogo: EMPATE!";
        jogoAtivo = false;
        return;
    }

    // Troca o jogador
    jogadorAtual = (jogadorAtual === 'X') ? 'O' : 'X';
    mensagem.textContent = `Jogador ${jogadorAtual}, é a sua vez!`;
}

// Adapte as funções de verificação (do código anterior) para cá:
function verificarVencedor(tabuleiro, jogador) {
    // ... Lógica de checagem de linhas, colunas e diagonais (igual ao código JS puro) ...
    
    // Exemplo da checagem de linhas
    for (let i = 0; i < 3; i++) {
        if (tabuleiro[i][0] === jogador && tabuleiro[i][1] === jogador && tabuleiro[i][2] === jogador) return true;
    }
    // ... (restante da lógica de vitória) ...

    return false; // TEMPORÁRIO!
}

function verificarEmpate(tabuleiro) {
    // ... Lógica para checar se todas as células estão preenchidas ...
    return false; // TEMPORÁRIO!
}


function reiniciarJogo() {
    tabuleiro = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    jogadorAtual = 'X';
    jogoAtivo = true;
    mensagem.textContent = `Jogador ${jogadorAtual}, é a sua vez!`;
    
    // Limpa o conteúdo visual das células
    celulas.forEach(celula => {
        celula.textContent = '';
    });
}

// Inicia o jogo na primeira carga
mensagem.textContent = `Jogador ${jogadorAtual}, é a sua vez!`;