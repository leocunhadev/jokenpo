var numeroAleatorio = 0;
var numeroClicado = 0;
var suasVitorias = 0;
var suasDerrotas = 0;
var empates = 0;

var ganhouPerdeu = $(".ganhou-perdeu");

$(".pedra").click(function () {
  numeroClicado = 0;
  geraNumero();
  resultado();
});
$(".papel").click(function () {
  numeroClicado = 1;
  geraNumero();
  resultado();
});
$(".tesoura").click(function () {
  numeroClicado = 2;
  geraNumero();
  resultado();
});

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
    numDeEmpates();
    ganhouPerdeu.text(`Empate! Ambos escolheram ${playerChoiceName}.`);
  } else if ((numeroClicado - numeroAleatorio + 3) % 3 == 1) {
    contadorDeVitorias();
    ganhouPerdeu.text(`Você ganhou! ${playerChoiceName} vence ${computerChoiceName}.`);
  } else {
    contadorDeDerrotas();
    ganhouPerdeu.text(`Você perdeu! ${computerChoiceName} vence ${playerChoiceName}.`);
  }
}

function colocaImagem() {
  var classImagens = $(".imagemMao");
  if (numeroAleatorio == 0) {
    classImagens.attr("src", "img/pedra.png").attr("alt", "Rock");
  }
  if (numeroAleatorio == 1) {
    classImagens.attr("src", "img/papel.png").attr("alt", "Paper");
  }
  if (numeroAleatorio == 2) {
    classImagens.attr("src", "img/tesoura.png").attr("alt", "Scissors");
  }
  classImagens.addClass("visible");
}

function contadorDeVitorias() {
  suasVitorias++;
  $(".vitorias").text(suasVitorias);
}

function contadorDeDerrotas() {
  suasDerrotas++;
  $(".derrotas").text(suasDerrotas);
}

function numDeEmpates() {
  empates++;
  $(".empates").text(empates);
}