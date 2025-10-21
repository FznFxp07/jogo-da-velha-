// --- VARIÁVEIS DE ESTADO DO JOGO ---
let tabuleiro = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let jogadorAtual = 'X';
let jogoAtivo = true;

// OBJETOS PARA ARMAZENAR NOME E PLACAR
let jogadorX = { name: 'Jogador X', symbol: 'X', wins: 0 };
let jogadorO = { name: 'Jogador O', symbol: 'O', wins: 0 };

// --- ELEMENTOS DO DOM (HTML) ---
const mensagem = document.getElementById('mensagem');
const celulas = document.querySelectorAll('.celula');
const botaoReiniciar = document.getElementById('reiniciar');
const placarXElement = document.getElementById('placar-x');
const placarOElement = document.getElementById('placar-o');


// --- INICIALIZAÇÃO ---

document.addEventListener('DOMContentLoaded', () => {
    // Pede os nomes ao carregar a página
    pedirNomesJogadores();
    
    // Atualiza o placar visual e configura a primeira mensagem
    atualizarPlacarVisual();
    
    // Configura os eventos de clique
    celulas.forEach(celula => {
        celula.addEventListener('click', aoClicarCelula);
    });
    botaoReiniciar.addEventListener('click', reiniciarRodada);
    
    mensagem.textContent = `${jogadorX.name} (X), é a sua vez!`;
});

// --- FUNÇÕES DE PLACAR E NOME ---

function pedirNomesJogadores() {
    const nomeX = prompt("Qual o nome do Jogador X?");
    if (nomeX && nomeX.trim() !== "") jogadorX.name = nomeX;

    const nomeO = prompt("Qual o nome do Jogador O?");
    if (nomeO && nomeO.trim() !== "") jogadorO.name = nomeO;
}

function atualizarPlacarVisual() {
    placarXElement.textContent = `${jogadorX.name} (X): ${jogadorX.wins}`;
    placarOElement.textContent = `${jogadorO.name} (O): ${jogadorO.wins}`;
}

// --- FUNÇÕES DE LÓGICA DO JOGO ---

function aoClicarCelula(evento) {
    if (!jogoAtivo) return; // Se o jogo acabou, não permite mais cliques

    const celulaClicada = evento.target;
    const linha = parseInt(celulaClicada.dataset.linha);
    const coluna = parseInt(celulaClicada.dataset.coluna);

    // Checa se a célula já está preenchida
    if (tabuleiro[linha][coluna] !== '') {
        return;
    }

    // Atualiza o estado lógico e visual
    tabuleiro[linha][coluna] = jogadorAtual;
    celulaClicada.textContent = jogadorAtual; 

    // Identifica o objeto do jogador atual
    const currentPlayerObj = (jogadorAtual === 'X') ? jogadorX : jogadorO;

    if (verificarVencedor(tabuleiro, jogadorAtual)) {
        // VITÓRIA!
        mensagem.textContent = `🎉 VITÓRIA! ${currentPlayerObj.name} (${jogadorAtual}) VENCEU!`;
        jogoAtivo = false;
        
        currentPlayerObj.wins++; // Incrementa a contagem de vitórias
        atualizarPlacarVisual();
        
        return;
    }

    if (verificarEmpate(tabuleiro)) {
        // EMPATE!
        mensagem.textContent = "Fim da Rodada: EMPATE!";
        jogoAtivo = false;
        return;
    }

    // Troca o jogador
    jogadorAtual = (jogadorAtual === 'X') ? 'O' : 'X';
    const nextPlayerObj = (jogadorAtual === 'X') ? jogadorX : jogadorO;
    mensagem.textContent = `${nextPlayerObj.name} (${jogadorAtual}), é a sua vez!`;
}

function reiniciarRodada() {
    // Zera o tabuleiro
    tabuleiro = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    jogoAtivo = true;
    
    // Limpa o conteúdo visual das células
    celulas.forEach(celula => {
        celula.textContent = '';
    });
    
    // Mantém a vez do jogador atual (o que ia jogar na próxima rodada)
    const currentPlayerObj = (jogadorAtual === 'X') ? jogadorX : jogadorO;
    mensagem.textContent = `${currentPlayerObj.name} (${jogadorAtual}), é a sua vez!`;
}

// --- FUNÇÕES DE VERIFICAÇÃO ---

function verificarVencedor(tabuleiro, jogador) {
    // Checa Linhas e Colunas
    for (let i = 0; i < 3; i++) {
        // Linhas
        if (tabuleiro[i][0] === jogador && tabuleiro[i][1] === jogador && tabuleiro[i][2] === jogador) return true;
        // Colunas
        if (tabuleiro[0][i] === jogador && tabuleiro[1][i] === jogador && tabuleiro[2][i] === jogador) return true;
    }
    // Checa Diagonais
    // Diagonal principal
    if (tabuleiro[0][0] === jogador && tabuleiro[1][1] === jogador && tabuleiro[2][2] === jogador) return true;
    // Diagonal secundária
    if (tabuleiro[0][2] === jogador && tabuleiro[1][1] === jogador && tabuleiro[2][0] === jogador) return true;

    return false;
}

function verificarEmpate(tabuleiro) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tabuleiro[i][j] === '') {
                return false;
            }
        }
    }
    return true; // Se não houver espaços vazios, é empate
}