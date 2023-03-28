import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import Team from '../database/models/TeamModel';

import { teamMock, teamsMock } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração para tabela "teams"', function() {
  let chaiHttpResponse: Response;

  describe('Testa a rota GET /teams, retornando todos os times cadastrados', function() {
    beforeEach(async function() {
      sinon
        .stub(Team, 'findAll')
        .resolves([
          ...teamsMock,
        ] as Team[]);
    });

    afterEach(function() {
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('Testa se a requisição retorna os dados corretamente', async function() {
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams');

      expect(chaiHttpResponse.status).to.deep.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(teamsMock);
    });
  });

  describe('Testa a rota GET /teams/:id, retornando o time com id correspondente', function() {
    afterEach(sinon.restore);

    it('Testa se a requisição retorna um time ao passar um id existente', async function() {
      sinon
        .stub(Team, 'findByPk')
        .resolves(teamMock as Team);

      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/1');

      expect(chaiHttpResponse.status).to.deep.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(teamMock);
    });

    it('Testa se a requisição retorna um erro quando um time correspondente não é encontrado', async function() {
      sinon
        .stub(Team, 'findByPk')
        .resolves(undefined);

      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/20');

      expect(chaiHttpResponse.status).to.deep.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Team not found' });
    });
  });
});
