document.addEventListener("DOMContentLoaded", async function () {
  let data = {};

  try {
    const response = await fetch(
      "https://api.github.com/users/0matheusfilipe/repos"
    );
    data = await response.json();
    console.log("Dados dos repositórios recebidos:", data);
    mostraRepo(data);
  } catch (error) {
    console.error("Erro ao buscar dados JSON:", error);
  }

  function mostraRepo(data) {
    const linha = document.getElementById("mostrar__repositorio");
    const novaDiv = document.createElement("div");
    novaDiv.className = "col-12";

    const params = new URLSearchParams(location.search);
    const idRepositorio = parseInt(params.get("id"));
    console.log("ID do repositório:", idRepositorio);

    let repos = data.find((repo) => repo.id === idRepositorio);

    if (repos) {
      console.log("Repositório encontrado:", repos);

      const createdAtDate = new Date(repos.created_at);
      const formatData = `${createdAtDate.getDate()}/${
        createdAtDate.getMonth() + 1
      }/${createdAtDate.getFullYear()}`;

      novaDiv.innerHTML = `
              <div class="">
                  <div class="fw-bold"><h2>${repos.name}</h2></div>
                  <div class="-body">
                      <p class="fw-bold text-primary">Descrição</p>
                      <p>${
                        repos.description || "Não há descrição disponível."
                      }</p>
                      <div class="row">
                          <div class="col-9">
                              <p class="fw-bold text-primary">Data de criação</p>
                              \<p class="-data">${new Date(
                                repos.created_at
                              ).toLocaleDateString()}</p>
                              <p class="fw-bold text-primary">Linguagem</p>
                              <p>${
                                repos.language || "Linguagem não especificada."
                              }</p>
                              <p class="fw-bold text-primary">Tópicos</p>
                              ${
                                repos.topics.length > 0
                                  ? repos.topics
                                      .map(
                                        (topic) =>
                                          `<span class="badge rounded-pill bg-primary mx-2 mb-2 p-2">${topic}</span>`
                                      )
                                      .join("")
                                  : "<p>Nenhum tópico identificado</p>"
                              }
                              <p class="fw-bold text-primary">Link de acesso:</p>
                              <a href="${
                                repos.html_url
                              }" class="text-decoration-none fw-bold" target="_blank">Ver Projeto</a>
                              </a>
                              <br><br>
                              <span class="h3 bi bi-star-fill"><a>${
                                repos.stargazers_count
                              }</a></span>
                              <span class="h3 bi bi-person-fill"><a>${
                                repos.forks_count
                              }</a></span>
                          </div>
                          <div class="col-sm-12 col-md-3 align-self-start mt-0">

                          </div>
                      </div>
                  </div>
              </div>
          `;
    } else {
      console.log("Repositório não encontrado");
      novaDiv.innerHTML = "<p>Repositório não encontrado.</p>";
    }

    linha.appendChild(novaDiv);
  }
});

mostraRepo();
