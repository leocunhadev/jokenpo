function dandoNome(choice) {
  const choices = ["Pedra", "Papel", "Tesoura"];
  return choices[choice];
}

const thinkingAnimation = {
    intervalId: null,
    images: ["img/pedra.png", "img/papel.png", "img/tesoura.png"],
    currentIndex: 0
};

function startThinkingAnimation() {
    const classImagens = $(".imagemMao");
    classImagens.addClass("visible"); // Make sure the image is visible to see the animation

    thinkingAnimation.intervalId = setInterval(() => {
        classImagens.attr("src", thinkingAnimation.images[thinkingAnimation.currentIndex]);
        thinkingAnimation.currentIndex = (thinkingAnimation.currentIndex + 1) % thinkingAnimation.images.length;
    }, 150); // Change image every 150ms
}

function stopThinkingAnimation() {
    clearInterval(thinkingAnimation.intervalId);
}

function geraNumero() {
  gameState.numeroAleatorio = Math.floor(Math.random() * 3);
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
