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

    const winConditions = {
        0: [2, 3], // Pedra vence Tesoura (2) e Lagarto (3)
        1: [0, 4], // Papel vence Pedra (0) e Spock (4)
        2: [1, 3], // Tesoura vence Papel (1) e Lagarto (3)
        3: [1, 4], // Lagarto vence Papel (1) e Spock (4)
        4: [0, 2]  // Spock vence Pedra (0) e Tesoura (2)
    };

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
    const choices = [
        { src: "img/pedra.png", alt: "Rock" },
        { src: "img/papel.png", alt: "Paper" },
        { src: "img/tesoura.png", alt: "Scissors" },
        { src: "img/lagarto.png", alt: "Lizard" },
        { src: "img/spock.png", alt: "Spock" }
    ];
    const choice = choices[gameState.numeroAleatorio];
    classImagens.attr("src", choice.src).attr("alt", choice.alt);
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
