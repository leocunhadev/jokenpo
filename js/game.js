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
    const resultElement = gameState.ganhouPerdeu;

    // Remove any existing result classes
    resultElement.removeClass("result-win result-loss result-tie");

    if (gameState.numeroClicado == gameState.numeroAleatorio) {
        numDeEmpates();
        resultElement.text(`Empate! Ambos escolheram ${playerChoiceName}.`).addClass("result-tie");
    } else if ((gameState.numeroClicado - gameState.numeroAleatorio + 3) % 3 == 1) {
        contadorDeVitorias();
        resultElement.text(`Você ganhou! ${playerChoiceName} vence ${computerChoiceName}.`).addClass("result-win");
    } else {
        contadorDeDerrotas();
        resultElement.text(`Você perdeu! ${computerChoiceName} vence ${playerChoiceName}.`).addClass("result-loss");
    }

    // Remove the class after the animation to clean up
    setTimeout(() => {
        resultElement.removeClass("result-win result-loss result-tie");
    }, 1000); // Duration matches the CSS animation

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