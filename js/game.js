const choices = ["Pedra", "Papel", "Tesoura", "Lagarto", "Spock"];
const imagePaths = [
    { src: "img/pedra.png", alt: "Rock" },
    { src: "img/papel.png", alt: "Paper" },
    { src: "img/tesoura.png", alt: "Scissors" },
    { src: "img/lagarto.png", alt: "Lizard" },
    { src: "img/spock.png", alt: "Spock" }
];

const winConditions = {
    0: [2, 3], // Rock beats Scissors, Lizard
    1: [0, 4], // Paper beats Rock, Spock
    2: [1, 3], // Scissors beats Paper, Lizard
    3: [1, 4], // Lizard beats Paper, Spock
    4: [0, 2]  // Spock beats Rock, Scissors
};

function dandoNome(choice) {
  return choices[choice];
}

function geraNumero() {
  gameState.numeroAleatorio = Math.floor(Math.random() * 5);
  colocaImagem();
}

function resultado() {
  const playerChoice = gameState.numeroClicado;
  const computerChoice = gameState.numeroAleatorio;
  const playerChoiceName = dandoNome(playerChoice);
  const computerChoiceName = dandoNome(computerChoice);

  if (playerChoice === computerChoice) {
    numDeEmpates();
    gameState.ganhouPerdeu.text(`Empate! Ambos escolheram ${playerChoiceName}.`);
  } else if (winConditions[playerChoice].includes(computerChoice)) {
    contadorDeVitorias();
    gameState.ganhouPerdeu.text(`Você ganhou! ${playerChoiceName} vence ${computerChoiceName}.`);
  } else {
    contadorDeDerrotas();
    gameState.ganhouPerdeu.text(`Você perdeu! ${computerChoiceName} vence ${playerChoiceName}.`);
  }
  autoSaveScore();
}

function colocaImagem() {
  const classImagens = $(".imagemMao");
  const imageInfo = imagePaths[gameState.numeroAleatorio];
  classImagens.attr("src", imageInfo.src).attr("alt", imageInfo.alt);
  classImagens.addClass("visible");
}

function contadorDeVitorias() {
  gameState.suasVitorias++;
  $(".vitorias").text(gameState.suasVitorias);
}

function contadorDeDerrotas() {
  gameState.suasDerrotas++;
  $(".derrotas").text(gameState.suasDerrotas);
}

function numDeEmpates() {
  gameState.empates++;
  $(".empates").text(gameState.empates);
}
