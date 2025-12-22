const MAX_HIGH_SCORES = 12;

async function autoSaveScore() {
    const playerName = $("#playerName").val().trim().toUpperCase();
    if (playerName === "") {
        return; // Don't save if no name is entered
    }

    const scoreData = {
        name: playerName,
        wins: gameState.suasVitorias,
        losses: gameState.suasDerrotas,
        ties: gameState.empates
    };

    try {
        await db.collection('scores').doc(playerName).set(scoreData);
        displayHighScores();
    } catch (error) {
        console.error("Error saving score to Firestore: ", error);
    }
}

async function displayHighScores() {
    const highScoreList = $("#highScoresList");
    highScoreList.empty();

    try {
        const querySnapshot = await db.collection('scores')
            .orderBy('wins', 'desc')
            .limit(MAX_HIGH_SCORES)
            .get();

        querySnapshot.forEach((doc) => {
            const score = doc.data();
            const newScoreItem = `<li>${score.name} - V:${score.wins}, D:${score.losses}</li>`;
            highScoreList.append(newScoreItem);
        });
    } catch (error) {
        console.error("Error getting high scores from Firestore: ", error);
    }
}
