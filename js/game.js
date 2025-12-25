const choices = ["Pedra", "Papel", "Tesoura", "Lagarto", "Spock"];
const winConditions = {
    Pedra: ["Tesoura", "Lagarto"],
    Papel: ["Pedra", "Spock"],
    Tesoura: ["Papel", "Lagarto"],
    Lagarto: ["Papel", "Spock"],
    Spock: ["Tesoura", "Pedra"]
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
    const choiceName = dandoNome(gameState.numeroAleatorio).toLowerCase();
    classImagens.attr("src", `img/${choiceName}.png`).attr("alt", choices[gameState.numeroAleatorio]);
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
