// =====================
// Menu hamburguer
// Abre e fecha o menu quando clicado no celular
// =====================
function abrirMenu() {
  let menu = document.querySelector(".menu");
  menu.classList.toggle("aberto");
}

// =====================
// Animação de entrada das seções
// =====================

// Pega todas as seções que têm a classe "animar"
let secoes = document.querySelectorAll(".animar");

// Verifica se cada seção já apareceu na tela do usuário
// Se sim, adiciona a classe "visivel" pra ativar a animação
function verificarAnimacao() {
  let limiteTela = window.innerHeight * 0.85;

  secoes.forEach(function(secao) {
    let topo = secao.getBoundingClientRect().top;

    if (topo < limiteTela) {
      secao.classList.add("visivel");
    }
  });
}

// =====================
// Ano no rodapé
// Coloca o ano atual automaticamente
// =====================
function colocarAno() {
  let ano = new Date().getFullYear();
  document.getElementById("ano").textContent = ano;
}

// =====================
// Integração com a API do GitHub
// Busca os repositórios do usuário e cria os cards automaticamente
// =====================
async function carregarProjetos() {
  let usuario = "ThiagoPaivaX";

  // Pega o container onde os cards serão colocados
  let container = document.querySelector(".lista-projetos");

  // Mostra uma mensagem enquanto carrega
  container.innerHTML = "<p style='color:#94a3b8;'>Carregando projetos...</p>";

  try {
    // Faz a requisição para a API pública do GitHub
    // sort=full_name ordena por nome em ordem crescente (A → Z)
    let resposta = await fetch(
      "https://api.github.com/users/" + usuario + "/repos?sort=full_name&direction=asc&per_page=100",
      { headers: { "Accept": "application/vnd.github+json" } }
    );

    // Se a resposta não for ok, lança um erro
    if (!resposta.ok) {
      throw new Error("Erro ao buscar repositórios");
    }

    // Converte a resposta para um array de objetos JavaScript
    let repos = await resposta.json();

    // Filtra os repos:
    // - remove forks (copiados de outros)
    // - remove arquivados
    // - remove o repo especial de perfil (que tem o mesmo nome do usuário)
    let filtrados = repos.filter(function(repo) {
      return !repo.fork && !repo.archived && repo.name.toLowerCase() !== usuario.toLowerCase();
    });

    // Se não tiver nenhum projeto, mostra mensagem
    if (filtrados.length === 0) {
      container.innerHTML = "<p style='color:#94a3b8;'>Nenhum projeto encontrado.</p>";
      return;
    }

    // Limpa o container antes de adicionar os cards
    container.innerHTML = "";

    // Percorre cada repositório e cria um card para ele
    filtrados.forEach(function(repo, indice) {

      // Número do card com dois dígitos: 01, 02, 03...
      let numero = String(indice + 1).padStart(2, "0");

      // Formata o nome: troca - e _ por espaço (ex: meu-projeto → meu projeto)
      let nome = repo.name.replace(/-|_/g, " ");

      // Usa a descrição do repo, ou um texto padrão se estiver vazia
      let descricao = repo.description ? repo.description : "Sem descrição disponível.";

      // Cria o elemento do card
      let card = document.createElement("div");
      card.className = "card";

      // Preenche o conteúdo interno do card
      card.innerHTML =
        "<span class='num'>" + numero + "</span>" +
        "<h3>" + nome + "</h3>" +
        "<p>" + descricao + "</p>" +
        "<a href='" + repo.html_url + "' target='_blank' class='btn-card'>Ver no GitHub</a>";

      // Adiciona o card ao container
      container.appendChild(card);
    });

    // Roda a verificação de animação de novo depois de criar os cards
    verificarAnimacao();

  } catch (erro) {
    // Se der algum erro na requisição, mostra mensagem de erro
    container.innerHTML = "<p style='color:#f87171;'>Não foi possível carregar os projetos. Tente novamente mais tarde.</p>";
    console.error(erro);
  }
}

// =====================
// Eventos
// =====================

// Quando o usuário rolar a página, verifica as animações
window.addEventListener("scroll", verificarAnimacao);

// Quando a página terminar de carregar, roda tudo
window.addEventListener("load", function() {
  verificarAnimacao();
  colocarAno();
  carregarProjetos();
});
