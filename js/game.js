const choices = ["Pedra", "Papel", "Tesoura", "Lagarto", "Spock"];
const imagePaths = [
    { src: "img/pedra.png", alt: "Rock" },
    { src: "img/papel.png", alt: "Paper" },
    { src: "img/tesoura.png", alt: "Scissors" },
    { src: "img/lagarto.png", alt: "Lizard" },
    { src: "img/spock.png", alt: "Spock" }
];

const winConditions = {
    "Pedra": ["Tesoura", "Lagarto"],
    "Papel": ["Pedra", "Spock"],
    "Tesoura": ["Papel", "Lagarto"],
    "Lagarto": ["Spock", "Papel"],
    "Spock": ["Tesoura", "Pedra"]
};

function dandoNome(choice) {
  return choices[choice];
}

function geraNumero() {
  gameState.numeroAleatorio = Math.floor(Math.random() * 5);
  colocaImagem();
}

function resultado() {
  const playerChoiceName = dandoNome(gameState.numeroClicado);
  const computerChoiceName = dandoNome(gameState.numeroAleatorio);

  if (playerChoiceName === computerChoiceName) {
    numDeEmpates();
    gameState.ganhouPerdeu.text(`Empate! Ambos escolheram ${playerChoiceName}.`);
  } else if (winConditions[playerChoiceName].includes(computerChoiceName)) {
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
