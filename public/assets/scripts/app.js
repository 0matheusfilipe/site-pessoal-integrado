const repositorios = document.querySelector('.row.ps-3.mb-3.pt-4');
const nomePerfil = document.querySelector('.h4.text-primary');
const contSeguidores = document.getElementById('followers-count');
const contSeguindo = document.getElementById('following-count');
const inforLocalizacao = document.getElementById('location');
const nomeEmpresa = document.getElementById('company-name');

async function pegarImagem(){
  let dados = await fetch("https://api.github.com/users/0matheusfilipe");
  let dadosUsuario = await dados.json();

  let imagem = dadosUsuario.avatar_url;
  return imagem;
}

async function mostrarImagem(){
  let imagem = await pegarImagem();
  let div__imagem = document.getElementById("imagem");
  let div = document.createElement("div");
  div.innerHTML = 
    `<img src="${imagem}" class="img-fluid mb-2" alt="foto-de-perfil">` 
    div__imagem.appendChild(div);
}

  mostrarImagem()
async function pegarAPIGitHub() {
  try {
    // busca informações do usuário
    let respostaInfoUsuario = await fetch("https://api.github.com/users/0matheusfilipe");
    if (!respostaInfoUsuario.ok) {
      throw new Error(respostaInfoUsuario.status);
    }
    let infoUsuario = await respostaInfoUsuario.json();

    // atualiza a contagem de seguidores
    contSeguidores.textContent = `${infoUsuario.followers} seguidores`;
    contSeguindo.textContent = `| ${infoUsuario.following} seguindo`;
    inforLocalizacao.textContent = `${infoUsuario.location}`;
    nomeEmpresa.textContent = `${infoUsuario.company}`;
    nomePerfil.textContent = `${infoUsuario.name} Silva`;

    // busca por repositorios
    let respostaRepositorio = await fetch("https://api.github.com/users/0matheusfilipe/repos");
    if (!respostaRepositorio.ok) {
      throw new Error(respostaRepositorio.status);
    }
    let repos = await respostaRepositorio.json();

    repos.forEach((item) => {
      let projeto = document.createElement('div');
      projeto.className = 'col-md-6 mb-3'; // Adiciona classes Bootstrap para disposição em duas colunas

      let linguagemClasse = '';
      switch (item.language) {
        case 'JavaScript':
          linguagemClasse = 'javascript';
          break;
        case 'Python':
          linguagemClasse = 'python';
          break;
        case 'C#':
          linguagemClasse = 'csharp';
          break;
        case 'HTML':
          linguagemClasse = 'html';
          break;
        case 'CSS':
          linguagemClasse = 'css';
          break;
        default:
          linguagemClasse = 'null';
      }

      projeto.innerHTML = 
      `
        <div class="card">
          <div class="card-body">
            <div class="section">
              <p class="h2 card-title">${item.name}</p>
              <span class="h6 card-data">${new Date(item.created_at).toLocaleDateString()}</span>
            </div>
            <div class="section">
              <a href="${item.html_url}" target="_blank">Ver Projeto</a>
              <a href="./repos.html?id=${item.id}" target="_blank">Ver Repositório</a>
              <span class="card-language"><span class="circle ${linguagemClasse}"></span>${item.language || 'Não especificado'}</span>
            </div>
          </div>
        </div>
      `;

      repositorios.appendChild(projeto);
    });
  } catch (error) {
    console.error('Erro ao buscar as informações do GitHub:', error);
  }
}

// Seleciona o elemento onde os cards serão inseridos
const infoContainer = document.getElementById('colegas-row');

// Função assíncrona para carregar os dados do JSON e criar os cards
async function carregarColegas() {
  try {
    // Faz a requisição para o arquivo JSON
    const resposta = await fetch('http://localhost:3000/colegas');
    
    // Verifica se a requisição foi bem sucedida
    if (!resposta.ok) {
      throw new Error('Erro ao carregar o arquivo JSON.');
    }
    
    // Extrai os dados do JSON
    const data = await resposta.json();

    // Itera sobre os colegas no array 'colegas'
    data.forEach(colega => {
      // Cria um elemento col-md-4 para cada colega (Bootstrap grid)
      const col = document.createElement('div');
      col.className = 'col-lg-2 col-md-3 col-sm-6 mb-4'; // Ajustando para 2 colunas em lg, 3 em md e 6 em sm

      // Cria o card (div com classe card do Bootstrap)
      const card = document.createElement('div');
      card.className = 'card h-100';

      // Cria a imagem do card (img com classe card-img-top do Bootstrap)
      const imagem = document.createElement('img');
      imagem.src = colega['url-foto'];
      imagem.className = 'card-img-top';
      imagem.alt = colega.nome;

      // Cria o corpo do card (div com classe card-body do Bootstrap)
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      // Cria o título do card (h5 com classe card-title do Bootstrap)
      const titulo = document.createElement('h5');
      titulo.className = 'card-title';
      titulo.textContent = colega.nome;

      // Cria a descrição do colega (p com classe card-text do Bootstrap)
      const descricao = document.createElement('p');
      descricao.className = 'card-text';
      descricao.textContent = colega.descricao;

      // Cria o link do card (a com classes btn e btn-primary do Bootstrap)
      const link = document.createElement('a');
      link.href = colega['url-github'];
      link.className = 'btn btn-primary stretched-link';
      link.target = '_blank';
      link.textContent = 'Visitar GitHub';

      // Adiciona a imagem ao topo do card
      card.appendChild(imagem);

      // Adiciona o corpo do card (título, descrição e link) ao card
      cardBody.appendChild(titulo);
      cardBody.appendChild(descricao);
      cardBody.appendChild(link);

      // Adiciona o corpo ao card
      card.appendChild(cardBody);

      // Adiciona o card à coluna
      col.appendChild(card);

      // Adiciona a coluna ao contêiner de colegas
      infoContainer.appendChild(col);
    });
    
  } catch (error) {
    console.error('Erro ao carregar informações dos colegas:', error);
  }
}

// Chamada da função para carregar as informações dos colegas
carregarColegas();
pegarAPIGitHub();
