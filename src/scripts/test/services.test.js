// Criamos o DOM antes de importar os módulos para evitar `null` porque o Jest não acessa o DOM do navegador!
document.body.innerHTML = `
  <section class="container">
    <header>
      <h2>Buscar Usuário</h2>
      <input type="text" id="input-search" placeholder="Digite o nome do usuário no GitHub">
      <input type="button" value="Buscar" id="btn-search">
    </header>
    <div class="profile-data"></div>
  </section>
`;

// Agora importamos `variables.js` para atualizar `infosContainer`
jest.resetModules(); //limpa o cache dos módulos carregados.
const variables = require("../modules/variables.js"); //chamada DEPOIS de definir o DOM do Jest para garantir que aponta pra ele e não para o do navegador dando valor NULL


// Agora podemos importar os módulos que dependem de `variables.js`, porque variables está apontando para o DOM correto do Jest
const { getUser, getRepositories } = require("../modules/services.js");
const { showUser, showRepositories } = require("../modules/htmlSetters.js");
const { test } = require("@jest/globals");

// Mockamos `showUser` para evitar manipulação real do DOM
jest.mock("../modules/htmlSetters.js", () => ({
   showUser: jest.fn(), //cria uma função espiã (spy), que permite verificar se foi chamada, com quais argumentos, etc.
   showRepositories: jest.fn()
}));

global.fetch = jest.fn(); //Isso substitui fetch globalmente por um mock. Como o Jest roda no Node.js, ele não tem o fetch do navegador nativamente.

describe("getUser and getRepositories", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const fakeProfile = {
    login: "nataliadev",
    name: "Natália",
    avatar_url: "https://example.com/avatar.jpg",
    bio: "Desenvolvedora",
    repos_url: "https://api.github.com/users/nataliadev/repos"
  };

  test("should get an user and call showUser and getRepositories", async () => {
    
    fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(fakeProfile),
    }); //Manipula qual deve ser a resposta do fetch mockado na linha 27

    await getUser("nataliadev");

    expect(fetch).toHaveBeenCalledWith("https://api.github.com/users/nataliadev");
    expect(fetch).toHaveBeenCalledWith(fakeProfile.repos_url);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(showUser).toHaveBeenCalledWith(fakeProfile);
  });

  test("should get user's repositories and call showRepositories", async () => {
    const fakeRepositories = [{
      html_url: "https://example.com/repo1",
      name: "testing-jest"
    },{
      html_url: "https://example.com/repo2",
      name: "testing-fetch"
    }]

    fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(fakeRepositories),
    });

    await getRepositories(fakeProfile);

    expect(fetch).toHaveBeenCalledWith(fakeProfile.repos_url);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(showRepositories).toHaveBeenCalledWith(fakeRepositories);
  })
});
