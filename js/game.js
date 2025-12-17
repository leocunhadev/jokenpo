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
  const choices = [
    { src: "img/pedra.png", alt: "Pedra" },
    { src: "img/papel.png", alt: "Papel" },
    { src: "img/tesoura.png", alt: "Tesoura" },
  ];
  const choice = choices[gameState.numeroAleatorio];
  $(".imagemMao")
    .attr("src", choice.src)
    .attr("alt", choice.alt)
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
