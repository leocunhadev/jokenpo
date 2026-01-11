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
  let resultText;

  if (gameState.numeroClicado == gameState.numeroAleatorio) {
    numDeEmpates();
    resultText = `E: ${playerChoiceName} vs ${computerChoiceName}`;
    gameState.ganhouPerdeu.text(`Empate! Ambos escolheram ${playerChoiceName}.`);
  } else if ((gameState.numeroClicado - gameState.numeroAleatorio + 3) % 3 == 1) {
    contadorDeVitorias();
    resultText = `V: ${playerChoiceName} > ${computerChoiceName}`;
    gameState.ganhouPerdeu.text(`Você ganhou! ${playerChoiceName} vence ${computerChoiceName}.`);
  } else {
    contadorDeDerrotas();
    resultText = `D: ${computerChoiceName} > ${playerChoiceName}`;
    gameState.ganhouPerdeu.text(`Você perdeu! ${computerChoiceName} vence ${playerChoiceName}.`);
  }

  gameState.roundHistory.unshift(resultText);
  updateHistoryDisplay();
  autoSaveScore();
}

function updateHistoryDisplay() {
    const historyContainer = $("#roundHistory");
    historyContainer.empty();

    gameState.roundHistory.forEach(result => {
        historyContainer.append(`<div>${result}</div>`);
    });

    historyContainer.scrollTop(0);
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
