# Estudo de teste unitário com Jest 

Esse estudo usa como base o projeto desenvolvido no repositório [quest-js-avancado-fetch](https://github.com/nataliabrunelli/quest-js-avancado-fetch). 

Seu objetivo é aplicar testes unitários com Jest em funções assíncronas que utilizam fetch, evitando chamadas desnecessárias à API.


## Tecnologias utilizadas:
- HTML
- CSS
- JavaScript (Vanilla JS)
- Jest (com jsdom)
- Babel


O Babel foi utilizado para converter o código entre ESM (usado no projeto e pelo navegador) e CJS (usado pelo Jest e Node). 

Já o jsdom permite que o Jest teste a manipulação do DOM, uma vez que ele não tem acesso ao DOM gerado pelo navegador.


## Como rodar e visualizar os testes:

- Clone o projeto na sua máquina
- Abra-o em sua IDE ou editor de código (como o VS Code)
- Instale as dependências executando o comando `npm install`
- Rode os testes com o comando `npm run test`
