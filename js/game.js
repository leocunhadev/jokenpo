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

  if (gameState.numeroClicado == gameState.numeroAleatorio) {
    numDeEmpates();
    gameState.ganhouPerdeu.text(`Empate! Ambos escolheram ${playerChoiceName}.`);
  } else if ((gameState.numeroClicado - gameState.numeroAleatorio + 3) % 3 == 1) {
    contadorDeVitorias();
    gameState.ganhouPerdeu.text(`Você ganhou! ${playerChoiceName} vence ${computerChoiceName}.`);
  } else {
    contadorDeDerrotas();
    gameState.ganhouPerdeu.text(`Você perdeu! ${computerChoiceName} vence ${playerChoiceName}.`);
  }
  autoSaveScore();
}

function colocaImagem() {
  var classImagens = $(".imagemMao");
  if (gameState.numeroAleatorio == 0) {
    classImagens.attr("src", "img/pedra.png");
  }
  if (gameState.numeroAleatorio == 1) {
    classImagens.attr("src", "img/papel.png");
  }
  if (gameState.numeroAleatorio == 2) {
    classImagens.attr("src", "img/tesoura.png");
  }
  classImagens.attr("alt", `O computador escolheu ${dandoNome(gameState.numeroAleatorio)}`);
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
