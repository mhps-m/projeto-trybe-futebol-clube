import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';

import { Response } from 'superagent';

import { teamMock, teamsMock } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração para tabela "teams"', () => {
  let chaiHttpResponse: Response;

  describe('Testa a rota GET /teams, retornando todos os times cadastrados', () => {
    before(async () => {
      sinon
        .stub(Team, "findAll")
        .resolves([
          ...teamsMock
        ] as Team[]);
    });
  
    after(()=>{
      (Team.findAll as sinon.SinonStub).restore();
    })
  
    it('Testa se a requisição retorna os dados corretamente', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/teams');

      expect(chaiHttpResponse.status).to.deep.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(teamsMock)
    });
  })
  
});
