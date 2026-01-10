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

async function handlePlayerNameChange() {
    const $playerName = $("#playerName");
    const playerName = $playerName.val().trim().toUpperCase();
    const lastPlayerName = $playerName.data('last-name');

    if (playerName === lastPlayerName) {
        return; // No change in player name
    }

    if (playerName === "") {
        gameState.suasVitorias = 0;
        gameState.suasDerrotas = 0;
        gameState.empates = 0;
        if (lastPlayerName) {
            try {
                await db.collection('scores').doc(lastPlayerName).delete();
            } catch (error) {
                console.error("Error deleting score from Firestore: ", error);
            }
        }
        displayHighScores();
    } else {
        try {
            const docRef = db.collection('scores').doc(playerName);
            const doc = await docRef.get();

            if (doc.exists) {
                const existingScore = doc.data();
                gameState.suasVitorias = existingScore.wins;
                gameState.suasDerrotas = existingScore.losses;
                gameState.empates = existingScore.ties;
            } else {
                gameState.suasVitorias = 0;
                gameState.suasDerrotas = 0;
                gameState.empates = 0;
            }
        } catch (error) {
            console.error("Error fetching score from Firestore: ", error);
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

    $playerName.data('last-name', playerName);
}

$("#playerName").change(handlePlayerNameChange);

$(".action-buttons").on("click", ".action-button", async function () {
    await handlePlayerNameChange();
    gameState.numeroClicado = parseInt($(this).data("choice"));
    geraNumero();
    resultado();
});

$(".reset-button").click(async function () {
    const playerName = $("#playerName").val().trim().toUpperCase();

    gameState.suasVitorias = 0;
    gameState.suasDerrotas = 0;
    gameState.empates = 0;

    $(".vitorias").text(gameState.suasVitorias);
    $(".derrotas").text(gameState.suasDerrotas);
    $(".empates").text(gameState.empates);
    gameState.ganhouPerdeu.text("");
    $(".imagemMao").removeClass("visible");
    $("#playerName").val("");
    $("#playerName").data('last-name', '');

    if (playerName) {
        try {
            await db.collection('scores').doc(playerName).delete();
        } catch (error) {
            console.error("Error deleting score from Firestore: ", error);
        }
    }
    await displayHighScores();
});

$(".high-scores-button").click(function () {
    const $highScores = $(".high-scores");
    const $button = $(this);

    $highScores.toggleClass("visible");

    if ($highScores.hasClass("visible")) {
        displayHighScores();
        $button.text("Back");
    } else {
        $button.text("High Scores");
    }
});
