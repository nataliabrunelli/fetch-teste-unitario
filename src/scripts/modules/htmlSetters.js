import { infosContainer } from "./variables.js";

async function showUser(profile) {
  infosContainer.innerHTML = `<div class="info">
                                <img src="${profile.avatar_url}">
                                <div class="data">
                                    <h1>${profile.nome ?? profile.login}</h1>
                                    <p>${
                                      profile.bio ??
                                      "O usuário não possui bio cadastrada."
                                    }</p>
                                    <p>Seguidores: ${profile.followers}</p>
                                    <p>Seguindo: ${profile.following}</p>
                                </div>
                              </div>`;
}

async function showRepositories(repositories) {
  let itensRepositorio = "";

  if (repositories.length) {
    repositories.forEach((repositorio, index) => {
      if (index < 10) {
        itensRepositorio += `<li><a href = "${repositorio.html_url}" target="_blank">${repositorio.name}</a><li>`;
      }
    });
  } else {
    itensRepositorio = "Usuário sem repositórios";
  }

  infosContainer.innerHTML += `<div class="repositories">
                                  <h2>Repositórios</h2>
                                  <ul>${itensRepositorio}</ul>
                                </div>`;
}

export { showUser, showRepositories }