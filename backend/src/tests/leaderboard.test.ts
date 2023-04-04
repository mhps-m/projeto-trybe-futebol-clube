import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { IMatch } from '../interfaces';
import { app } from '../app';
import { Team, Match } from '../database/models';

import { teamsMock } from './mocks/teams.mock';
import { matchesMock } from './mocks/matches.mock';
import { awayLeaderboardMock, homeLeaderboardMock, leaderboardMock } from './mocks/leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração da rota /leaderboard', function() {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('Testa se a rota GET /leaderboard/home/ retorna o placar filtrado pelos times da casa', async function() {
    sinon
      .stub(Team, 'findAll')
      .resolves(teamsMock as Team[]);

    sinon
      .stub(Match, 'findAll')
      .resolves(matchesMock as IMatch[] & Match[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.deep.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(homeLeaderboardMock);
  });

  it('Testa se a rota GET /leaderboard/home/ retorna o placar filtrado pelos times visitantes', async function() {
    sinon
      .stub(Team, 'findAll')
      .resolves(teamsMock as Team[]);

    sinon
      .stub(Match, 'findAll')
      .resolves(matchesMock as IMatch[] & Match[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/away');

    expect(chaiHttpResponse.status).to.deep.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(awayLeaderboardMock);
  });

  it('Testa se a rota GET /leaderboard/ retorna o placar sem filtros', async function() {
    sinon
      .stub(Team, 'findAll')
      .resolves(teamsMock as Team[]);

    sinon
      .stub(Match, 'findAll')
      .resolves(matchesMock as IMatch[] & Match[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard');

    expect(chaiHttpResponse.status).to.deep.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(leaderboardMock);
  });
});
