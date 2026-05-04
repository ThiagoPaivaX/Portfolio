// Abre e fecha o menu no celular
function abrirMenu() {
  let menu = document.querySelector(".menu");
  menu.classList.toggle("aberto");
}

// Pega todas as seções que precisam animar
let secoes = document.querySelectorAll(".animar");

// Verifica se cada seção está visível na tela
function verificarAnimacao() {
  let limiteTela = window.innerHeight * 0.85;

  secoes.forEach(function(secao) {
    let topo = secao.getBoundingClientRect().top;

    if (topo < limiteTela) {
      secao.classList.add("visivel");
    }
  });
}

// Coloca o ano atual no rodapé
function colocarAno() {
  let ano = new Date().getFullYear();
  document.getElementById("ano").textContent = ano;
}

// Eventos
window.addEventListener("scroll", verificarAnimacao);

window.addEventListener("load", function() {
  verificarAnimacao();
  colocarAno();
});
