const gameState = {
    numeroAleatorio: 0,
    numeroClicado: 0,
    suasVitorias: 0,
    suasDerrotas: 0,
    empates: 0,
    ganhouPerdeu: $(".ganhou-perdeu")
};

$(document).ready(function() {
    displayHighScores();
});

$("#playerName").focus(function () {
    $(this).data('last-name', $(this).val().trim());
}).change(function () {
    const playerName = $(this).val().trim();
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    if (playerName === "") {
        gameState.suasVitorias = 0;
        gameState.suasDerrotas = 0;
        gameState.empates = 0;
        // Also remove from high scores if name is cleared
        const nameToRemove = $(this).data('last-name');
        if (nameToRemove) {
            const updatedHighScores = highScores.filter(score => score.name.toLowerCase() !== nameToRemove.toLowerCase());
            localStorage.setItem('highScores', JSON.stringify(updatedHighScores));
        }
        displayHighScores();
    } else {
        const existingScore = highScores.find(score => score.name.toLowerCase() === playerName.toLowerCase());

        if (existingScore) {
            gameState.suasVitorias = existingScore.wins;
            gameState.suasDerrotas = existingScore.losses;
            gameState.empates = existingScore.ties;
        } else {
            gameState.suasVitorias = 0;
            gameState.suasDerrotas = 0;
            gameState.empates = 0;
        }
    }

    $(".vitorias").text(gameState.suasVitorias);
    $(".derrotas").text(gameState.suasDerrotas);
    $(".empates").text(gameState.empates);
    gameState.ganhouPerdeu.text("");
    $(".imagemMao").removeClass("visible");
});

$(".pedra").click(function () {
  gameState.numeroClicado = 0;
  geraNumero();
  resultado();
});
$(".papel").click(function () {
  gameState.numeroClicado = 1;
  geraNumero();
  resultado();
});
$(".tesoura").click(function () {
  gameState.numeroClicado = 2;
  geraNumero();
  resultado();
});

$(".reset-button").click(function () {
  gameState.suasVitorias = 0;
  gameState.suasDerrotas = 0;
  gameState.empates = 0;
  $(".vitorias").text(gameState.suasVitorias);
  $(".derrotas").text(gameState.suasDerrotas);
  $(".empates").text(gameState.empates);
  gameState.ganhouPerdeu.text("");
  $(".imagemMao").removeClass("visible");
  autoSaveScore(); // Persist the reset score
  $("#playerName").val("").trigger("change");
});

$(".high-scores-button").click(function () {
  $(".high-scores").addClass("visible");
});

$(".back-button").click(function () {
  $(".high-scores").removeClass("visible");
});
