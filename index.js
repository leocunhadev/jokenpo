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

function dandoNome(numeroClicado) {
  if (numeroClicado == 0) {
    numeroClicado = "Pedra";
  }

  if (numeroClicado == 1) {
    numeroClicado = "Papel";
  }

  if (numeroClicado == 2) {
    numeroClicado = "Tesoura";
  }

  return numeroClicado;
}

function geraNumero() {
  numeroAleatorio = Math.floor(Math.random() * 3);
  colocaImagem();
}

function resultado() {
  if (numeroClicado == numeroAleatorio) {
    numDeEmpates();
    ganhouPerdeu.text("Você empatou com o computador!");
  } else {
    if (numeroClicado == 0) {
      if (numeroAleatorio == 2) {
        contadorDeVitorias();
        ganhouPerdeu.text("Você ganhou!");
      } else {
        contadorDeDerrotas();
        ganhouPerdeu.text("Você perdeu!");
      }
    }
    if (numeroClicado == 1) {
      if (numeroAleatorio == 0) {
        contadorDeVitorias();
        ganhouPerdeu.text("Você ganhou!");
      } else {
        contadorDeDerrotas();
        ganhouPerdeu.text("Você perdeu!");
      }
    }
    if (numeroClicado == 2) {
      if (numeroAleatorio == 1) {
        contadorDeVitorias();
        ganhouPerdeu.text("Você ganhou!");
      } else {
        contadorDeDerrotas();
        ganhouPerdeu.text("Você perdeu!");
      }
    }
  }
}

function colocaImagem() {
  var classImagens = $(".imagemMao");
  if (numeroAleatorio == 0) {
    classImagens.attr("src", "img/pedra.png");
  }
  if (numeroAleatorio == 1) {
    classImagens.attr("src", "img/papel.png");
  }
  if (numeroAleatorio == 2) {
    classImagens.attr("src", "img/tesoura.png");
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