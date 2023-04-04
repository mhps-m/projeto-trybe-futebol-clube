
# Boas vindas ao projeto TFC - Trybe Futebol Clube!

O projeto TFC apresenta o desafio de desenvolver uma aplicação back-end e o seu banco de dados para alimentar uma aplicação front-end já pronta.

Utilizando Express e Sequelize com Typescript, e empregando POO/OOP, foi construída uma API que permite gerenciar um banco contendo informações sobre times de futebol e suas partidas.

É possível ver os placares dos times, baseados em diversos parâmetros (como pontuação total, número de gols feitos e recebidos), diretamente por uma requisição ao back-end, necessitando o front apenas renderizar os dados. Usuários autenticados também podem cadastrar novas partidas, assim como editar o placar e finalizar partidas em andamento.

Também foram desenvolvidos extensos testes de integração para todas as rotas do back-end.

Projeto realizado como parte da grade curricular do curso de Desenvolvimento Web da [Trybe](https://www.betrybe.com/)

**NOTA: Apenas o back-end foi desenvolvido por mim, que é a proposta do projeto. O front foi desenvolvido completamente pela Trybe, ao qual eu fiz poucas alterações.**

## Tecnologias utilizadas

**NodeJS**, **Docker**, **Typescript**, **Express**, **Sequelize**, **Chai**

## Instalação

Clone o projeto para sua máquina:

`$ git clone https://github.com/mhps-mtrybe-projeto-trybesmith.git`


## Executando o projeto

  ### Requisitos
  - Node
  - Docker Compose

  > Suba os containers que vão executar a aplicação: 
  - `$ docker compose up -d`.
  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte.
  - Esses serviços irão inicializar três containers: um para o **banco de dados**, um para o **back-end**, e o último para o **front-end**.
  - A partir daqui você pode acessar o front-end na porta `3000` (padrão), ou fazer requisiçes diretamente ao back pela porta `3001` (padrão).
  - :warning: **O container do banco de dados (db) pode inicializar 'unhealthy'**. Espere ele terminar de iniciar totalmente (o container roda uma imagem MySQL e pode demorar até inicializar o banco por completo), e rode o comando `$ docker compose up -d` novamente.

## Como utilizar

  - O front-end é bem simples de utilizar. A página principal '/leaderboard' permite ver o placar dos times e filtrar por times que jogaram como times da casa ou como times visitantes.
  - Para editar, finalizar e criar novas partidas, faça o login. Utilize o email `user@user.com` e senha `secret_user` para efetuar o login.
  
## Documentação do back-end
<details>
  <summary></summary></ br>

  #### :warning: Parâmetros devem ser passados pelo corpo/body da requisição caso não seja especificado :warning:

  ### Retorna todos os times

  ```
    GET /teams
  ```

  Retorna um array com todos os times cadastrados.

  Exemplo de resposta:
  
  `HTTP 200`
  ```json
    [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
    ]
  ```
  <br></br>
  
  ### Retorna um time específico

  ```
    GET /teams/:id
  ```

  | Parâmetro (URL)  | Descrição |
  | :--------------- | :-------- |
  | `id`           | `ID do time que deseja retornar.`  | 

  Retorna o nome do time e seu id.

  Exemplo de resposta:
  
  `HTTP 200`
  ```json
      {
        "id": 5,
        "teamName": "Cruzeiro"
      }
  ```
  <br></br>

  ### Faz login de um usuário

  ```
    POST /login
  ```

  | Parâmetro   | Tipo       | Descrição                                   |
  | :---------- | :--------- | :------------------------------------------ |
  | `email`      | `string` | **Obrigatório**. O email do usuário. Deve seguir o formato `exemplo@exemplo.exemplo` |
  | `password`    | `string` | **Obrigatório**. A senha do usuário. Mínimo de 6 caracteres.  |

  Recebe dados de um usuário e retorna JSON Web Token para autenticação em certos métodos.

  Exemplo de resposta:

  `HTTP 200`
  ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"
    }
  ```
  <br></br>

  ### Retorna a role de um usuário

  ```
    GET /login/role
  ```

  | Header   | Descrição                                   |
  | :---------- | :------------------------------------------ |
  | `authorization`      | **Obrigatório**. O token para autenticar e acessar a role do usuário. |

  Retorna um objeto com a role do usuário autenticado.

  Exemplo de resposta:
  
  `HTTP 200`
  ```json
      { "role": "admin" }
  ```
  <br></br>

  ### Retorna todas as partidas

  ```
    GET /matches?inProgress=boolean
  ```

  | Query   | Descrição                                   |
  | :---------- | :------------------------------------------ |
  | `inProgress`      |  **Opcional**. Recebe 'true' ou 'false'. |

  Retorna todas as partidas cadastradas, e opcionalmente as filtra baseado em seu progresso (em andamento ou finalizadas, caso a query `inProgress` receba `true` ou `false`, respectivamente).
  
  Exemplo de resposta:
  
  `HTTP 200`
  ```json
     [
      {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      },
      ...
      {
        "id": 41,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      }
     ]
  ```
  <br></br>

  ### Finaliza uma partida

  ```
    PATCH /matches/:id/finish
  ```
  
  | Header   | Descrição                                   |
  | :---------- | :------------------------------------------ |
  | `authorization`      | **Obrigatório**. Token para autenticação do usuário. |

  | Parâmetro (URL)   | Descrição                                   |
  | :---------- | :------------------------------------------ |
  | `id`      |  **Obrigatório**. O ID da partida **em progresso** a ser finalizada. |

  Atualiza o andamento de uma partida para ser finalizada (inProgress = false).
  
  Resposta:
  
  `HTTP 200`
  ```json
      {
        "message": "Finished"
      }
  ```
  <br></br>

  ### Atualiza uma partida

  ```
    PATCH /matches/:id
  ```
  
  | Header   | Descrição                                   |
  | :---------- | :------------------------------------------ |
  | `authorization`      | **Obrigatório**. Token para autenticação do usuário. |

  | Parâmetro (URL)   | Descrição                                   |
  | :---------- | :------------------------------------------ |
  | `id`      |  **Obrigatório**. O ID da partida **em progresso** a ser atualizada. |
  
  | Parâmetro (Body)  | Tipo       | Descrição                                   |
  | :---------- | :--------- | :------------------------------------------ |
  | `homeTeamGoals`      | `number` | **Obrigatório***. O novo número do placar do time da casa. |
  | `awayTeamGoals`    | `number` | **Obrigatório***. O novo número do placar do time visitante.  |

  Atualiza o placar de uma partida.
  
  * É necessário passar apenas um dos dois parâmetros no corpo da requisição, caso queira atualizar o placar de apenas um time.
  
  Resposta:
  
  `HTTP 200`
  ```json
      {
        "message": "Updated"
      }
  ```
  <br></br>

  ### Cadastra uma partida

  ```
    POST /matches/
  ```
  
  | Header   | Descrição                                   |
  | :---------- | :------------------------------------------ |
  | `authorization`      | **Obrigatório**. Token para autenticação do usuário. |
  
  | Parâmetro (Body)  | Tipo       | Descrição                                   |
  | :---------- | :--------- | :------------------------------------------ |
  | `homeTeamGoals`      | `number` | **Obrigatório**. O placar inicial do time da casa. |
  | `awayTeamGoals`    | `number` | **Obrigatório**. O placar inicial do time visitante.  |
  | `homeTeamId`      | `number` | **Obrigatório**. O ID do time da casa. |
  | `awayTeamId`      | `number` | **Obrigatório**. O ID do time da casa. |


  Cadastra uma nova partida entre dois times **diferentes**, e retorna um objeto com os dados da nova partida.
  
  Exemplo de resposta:
  
  `HTTP 201`
  ```json
      {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 8,
        "awayTeamGoals": 2,
        "inProgress": true,
      }
  ```
  <br></br>

  ### Retorna o placar dos times

  ```
    GET /leaderboard
  ```
  

  Retorna o placar de todos os times cadastrados, baseado nos seguintes critérios:
  
  - **1. Pontuação:**
    - Cada vitória concede ao time 3 pontos, enquanto empates concedem 1 ponto. Derrotas não influenciam na contagem de pontos.
  
  - **2. Saldo de gols:**
    - Subtrai a quantidade de gols sofridos da quantidade de gols marcados.

  - **3. Gols marcados.**

  Além disso, o cálculo do **aproveitamento do time (%)** `(efficiency)` - a porcentagem de jogos ganhos -, é dada pela fórmula:
  
  `[Pontuação / (Quantidade de jogos * 3)] * 100`
  
  Exemplo de resposta:
  
  `HTTP 200`
  ```json
    [
      {
        "name": "Palmeiras",
        "totalPoints": 13,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 17,
        "goalsOwn": 5,
        "goalsBalance": 12,
        "efficiency": "86.67"
      },
      {
        "name": "Corinthians",
        "totalPoints": 12,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 12,
        "goalsOwn": 3,
        "goalsBalance": 9,
        "efficiency": "80.00"
      },
      {
        "name": "Santos",
        "totalPoints": 11,
        "totalGames": 5,
        "totalVictories": 3,
        "totalDraws": 2,
        "totalLosses": 0,
        "goalsFavor": 12,
        "goalsOwn": 6,
        "goalsBalance": 6,
        "efficiency": "73.33"
      },
      {
        "name": "Grêmio",
        "totalPoints": 10,
        "totalGames": 5,
        "totalVictories": 3,
        "totalDraws": 1,
        "totalLosses": 1,
        "goalsFavor": 9,
        "goalsOwn": 8,
        "goalsBalance": 1,
        "efficiency": "66.67"
      },
      {
        "name": "Internacional",
        "totalPoints": 10,
        "totalGames": 5,
        "totalVictories": 3,
        "totalDraws": 1,
        "totalLosses": 1,
        "goalsFavor": 7,
        "goalsOwn": 6,
        "goalsBalance": 1,
        "efficiency": "66.67"
      },
      ...
    ]
  ```
  <br></br>

  ### Retorna o placar dos times da casa

  ```
    GET /leaderboard/home
  ```
  
  Retorna o placar de todos os times cadastrados, mas usando apenas os jogos que os times jogaram como times da casa para calcular e ordenar o placar.
    
  Exemplo de resposta:
  
  `HTTP 200`
  ```json
    [
      {
        "name": "Santos",
        "totalPoints": 9,
        "totalGames": 3,
        "totalVictories": 3,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 9,
        "goalsOwn": 3,
        "goalsBalance": 6,
        "efficiency": "100.00"
      },
      {
        "name": "Corinthians",
        "totalPoints": 9,
        "totalGames": 3,
        "totalVictories": 3,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 8,
        "goalsOwn": 2,
        "goalsBalance": 6,
        "efficiency": "100.00"
      },
      {
        "name": "Palmeiras",
        "totalPoints": 7,
        "totalGames": 3,
        "totalVictories": 2,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 10,
        "goalsOwn": 5,
        "goalsBalance": 5,
        "efficiency": "77.78"
      },
      ...
    ]
  ```
  <br></br>

  ### Retorna o placar dos times visitantes

  ```
    GET /leaderboard/away
  ```
  
  Retorna o placar de todos os times cadastrados, mas usando apenas os jogos que os times jogaram como times visitantes para calcular e ordenar o placar.
    
  Exemplo de resposta:
  
  `HTTP 200`
  ```json
    [
      {
        "name": "Palmeiras",
        "totalPoints": 6,
        "totalGames": 2,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 7,
        "goalsOwn": 0,
        "goalsBalance": 7,
        "efficiency": "100.00"
      },
      {
        "name": "Corinthians",
        "totalPoints": 6,
        "totalGames": 3,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 6,
        "goalsOwn": 2,
        "goalsBalance": 4,
        "efficiency": "66.67"
      },
      {
        "name": "Internacional",
        "totalPoints": 6,
        "totalGames": 2,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 3,
        "goalsOwn": 0,
        "goalsBalance": 3,
        "efficiency": "100.00"
      },
      ...
    ]
  ```
  </details>

  ## Sobre mim

  Sou um desenvolvedor back-end júnior.
   - [LinkedIn](https://www.linkedin.com/in/miguel-soares-dev/)
