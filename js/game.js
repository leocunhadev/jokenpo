const winConditions = {
  // Pedra
  0: [2, 3],
  // Papel
  1: [0, 4],
  // Tesoura
  2: [1, 3],
  // Lagarto
  3: [1, 4],
  // Spock
  4: [0, 2],
};

function dandoNome(choice) {
  const choices = ["Pedra", "Papel", "Tesoura", "Lagarto", "Spock"];
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
  const imagePaths = [
    "img/pedra.png",
    "img/papel.png",
    "img/tesoura.png",
    "img/lagarto.png",
    "img/spock.png",
  ];
  const choiceIndex = gameState.numeroAleatorio;
  const choiceName = dandoNome(choiceIndex);

  $(".imagemMao")
    .attr("src", imagePaths[choiceIndex])
    .attr("alt", choiceName)
    .addClass("visible");
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
