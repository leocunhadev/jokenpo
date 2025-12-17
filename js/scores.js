const MAX_HIGH_SCORES = 10;

function autoSaveScore() {
    const playerName = $("#playerName").val().trim();
    if (playerName === "") {
        return; // Don't save if no name is entered
    }

    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const existingScoreIndex = highScores.findIndex(score => score.name.toLowerCase() === playerName.toLowerCase());

    if (existingScoreIndex > -1) {
        // Update existing score
        highScores[existingScoreIndex].wins = gameState.suasVitorias;
        highScores[existingScoreIndex].losses = gameState.suasDerrotas;
        highScores[existingScoreIndex].ties = gameState.empates;
    } else {
        // Add new score
        const newScore = {
            name: playerName,
            wins: gameState.suasVitorias,
            losses: gameState.suasDerrotas,
            ties: gameState.empates
        };
        highScores.push(newScore);
    }

    highScores.sort((a, b) => b.wins - a.wins); // Sort by wins descending
    highScores.splice(MAX_HIGH_SCORES); // Keep only top 5

    localStorage.setItem('highScores', JSON.stringify(highScores));
    displayHighScores();
}

function displayHighScores() {
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const highScoreList = $("#highScoresList");
    highScoreList.empty();

    // Sort and truncate the scores before displaying them.
    highScores.sort((a, b) => b.wins - a.wins);
    highScores.splice(MAX_HIGH_SCORES);

    highScores.forEach(score => {
        const newScoreItem = `<li>${score.name} - V: ${score.wins}, D: ${score.losses}, E: ${score.ties}</li>`;
        highScoreList.append(newScoreItem);
    });
}
