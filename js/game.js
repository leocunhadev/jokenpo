function dandoNome(choice) {
  const choices = ["Pedra", "Papel", "Tesoura"];
  return choices[choice];
}

function geraNumero() {
  gameState.numeroAleatorio = Math.floor(Math.random() * 3);
  colocaImagem();
}

function resultado() {
  const playerChoiceName = dandoNome(gameState.numeroClicado);
  const computerChoiceName = dandoNome(gameState.numeroAleatorio);

  const choices = ["pedra", "papel", "tesoura"];
  const playerChoiceSelector = `.${choices[gameState.numeroClicado]}`;
  const $playerChoice = $(playerChoiceSelector)
  const $computerChoice = $('.imagemMao');

  if (gameState.numeroClicado == gameState.numeroAleatorio) {
    numDeEmpates();
    gameState.ganhouPerdeu.text(`Empate! Ambos escolheram ${playerChoiceName}.`);
  } else if ((gameState.numeroClicado - gameState.numeroAleatorio + 3) % 3 == 1) {
    contadorDeVitorias();
    gameState.ganhouPerdeu.text(`Você ganhou! ${playerChoiceName} vence ${computerChoiceName}.`);
    $playerChoice.addClass('winner');
    $computerChoice.addClass('loser');
  } else {
    contadorDeDerrotas();
    gameState.ganhouPerdeu.text(`Você perdeu! ${computerChoiceName} vence ${playerChoiceName}.`);
    $playerChoice.addClass('loser');
    $computerChoice.addClass('winner');
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
