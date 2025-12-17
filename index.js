// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAegXzqP1IjuNRtMOnWqL4Ld3esIwwsXI",
    authDomain: "leocunhadev-jokenpo.firebaseapp.com",
    projectId: "leocunhadev-jokenpo",
    storageBucket: "leocunhadev-jokenpo.firebasestorage.app",
    messagingSenderId: "988221881566",
    appId: "1:988221881566:web:2b3f6484b599426835964f",
    measurementId: "G-5VTJMEH8LS"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Game state variables
var numeroAleatorio = 0;
var numeroClicado = 0;
var suasVitorias = 0;
var suasDerrotas = 0;
var empates = 0;
var currentPlayer = "";

// jQuery element references
var ganhouPerdeu = $(".ganhou-perdeu");
var vitoriasSpan = $(".vitorias");
var derrotasSpan = $(".derrotas");
var empatesSpan = $(".empates");
var playerNameInput = $("#playerName");
var highScoresContainer = $(".high-scores");
var highScoresList = $("#highScoresList");

// Event Listeners
$(".pedra").click(function() {
    numeroClicado = 0;
    runGame();
});
$(".papel").click(function() {
    numeroClicado = 1;
    runGame();
});
$(".tesoura").click(function() {
    numeroClicado = 2;
    runGame();
});

playerNameInput.on('change', function() {
    currentPlayer = $(this).val().trim().toUpperCase();
    if (currentPlayer) {
        loadScore(currentPlayer);
    } else {
        resetScores();
    }
});

// Toggle high scores visibility when clicking the main screen
$(".screen").on('click', function(e) {
    if (e.target === this || $(e.target).hasClass('screen-title')) {
        highScoresContainer.toggleClass('visible');
    }
});


// Game Logic
function runGame() {
    if (!currentPlayer) {
        ganhouPerdeu.text("Please enter your name!");
        return;
    }
    geraNumero();
    resultado();
    saveScore();
}

function dandoNome(choice) {
    const choices = ["Pedra", "Papel", "Tesoura"];
    return choices[choice];
}

function geraNumero() {
    numeroAleatorio = Math.floor(Math.random() * 3);
    colocaImagem();
}

function resultado() {
    const playerChoiceName = dandoNome(numeroClicado);
    const computerChoiceName = dandoNome(numeroAleatorio);

    if (numeroClicado == numeroAleatorio) {
        empates++;
        ganhouPerdeu.text(`Empate! Ambos escolheram ${playerChoiceName}.`);
    } else if ((numeroClicado - numeroAleatorio + 3) % 3 == 1) {
        suasVitorias++;
        ganhouPerdeu.text(`Você ganhou! ${playerChoiceName} vence ${computerChoiceName}.`);
    } else {
        suasDerrotas++;
        ganhouPerdeu.text(`Você perdeu! ${computerChoiceName} vence ${playerChoiceName}.`);
    }
    updateScoreUI();
}

function colocaImagem() {
    var classImagens = $(".imagemMao");
    const choices = ["pedra", "papel", "tesoura"];
    const choiceName = choices[numeroAleatorio];
    classImagens.attr("src", `img/${choiceName}.png`).attr("alt", choiceName);
    classImagens.addClass("visible");
}

function updateScoreUI() {
    vitoriasSpan.text(suasVitorias);
    derrotasSpan.text(suasDerrotas);
    empatesSpan.text(empates);
}

function resetScores() {
    suasVitorias = 0;
    suasDerrotas = 0;
    empates = 0;
    updateScoreUI();
}

// Firebase Functions
function saveScore() {
    if (!currentPlayer) return;

    db.collection("scores").doc(currentPlayer).set({
            name: currentPlayer,
            wins: suasVitorias,
            losses: suasDerrotas,
            ties: empates
        })
        .then(() => {
            console.log("Score saved!");
            fetchHighScores(); // Refresh high scores after saving
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

function loadScore(playerName) {
    db.collection("scores").doc(playerName).get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            suasVitorias = data.wins;
            suasDerrotas = data.losses;
            empates = data.ties;
            console.log("Score loaded for player: ", playerName);
        } else {
            console.log("New player: ", playerName);
            resetScores();
        }
        updateScoreUI();
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function fetchHighScores() {
    highScoresList.empty();
    db.collection("scores").orderBy("wins", "desc").limit(5).get().then((querySnapshot) => {
        if (querySnapshot.empty) {
            highScoresList.append(`<li><span>NO SCORES</span></li>`);
        } else {
            querySnapshot.forEach((doc) => {
                const score = doc.data();
                highScoresList.append(`<li><span>${score.name}</span><span>${score.wins} wins</span></li>`);
            });
        }
    }).catch((error) => {
        console.error("Error fetching scores: ", error);
        highScoresList.append(`<li><span>ERROR</span></li>`);
    });
}

// Initial Load
$(document).ready(function() {
    fetchHighScores();
});