const winConditions = {
  0: [2, 3], // Rock > Scissors, Lizard
  1: [0, 4], // Paper > Rock, Spock
  2: [1, 3], // Scissors > Paper, Lizard
  3: [1, 4], // Lizard > Paper, Spock
  4: [0, 2], // Spock > Rock, Scissors
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
    gameState.ganhouPerdeu.text(
      `Você ganhou! ${playerChoiceName} vence ${computerChoiceName}.`
    );
  } else {
    contadorDeDerrotas();
    gameState.ganhouPerdeu.text(
      `Você perdeu! ${computerChoiceName} vence ${playerChoiceName}.`
    );
  }
  autoSaveScore();
}

function colocaImagem() {
  var classImagens = $(".imagemMao");
  if (gameState.numeroAleatorio == 0) {
    classImagens.attr("src", "img/pedra.png").attr("alt", "Rock");
  }
  if (gameState.numeroAleatorio == 1) {
    classImagens.attr("src", "img/papel.png").attr("alt", "Paper");
  }
  if (gameState.numeroAleatorio == 2) {
    classImagens.attr("src", "img/tesoura.png").attr("alt", "Scissors");
  }
  if (gameState.numeroAleatorio == 3) {
    classImagens.attr("src", "img/lagarto.png").attr("alt", "Lizard");
  }
  if (gameState.numeroAleatorio == 4) {
    classImagens.attr("src", "img/spock.png").attr("alt", "Spock");
  }
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
