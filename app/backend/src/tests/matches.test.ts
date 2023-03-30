import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import Match from '../database/models/MatchModel';

import { matchesMock } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração para a rota /matches', () => {
  let chaiHttpResponse: Response;

  describe('Testa a rota GET /teams, retornando todos os times cadastrados', () => {
    it('Retorna os times com sucesso', async () => {
      sinon
        .stub(Match, 'findAll')
        .resolves(matchesMock as Match);

      chaiHttpResponse = await chai
        .request(app)
        .get('/teams');

      expect(chaiHttpResponse.status).to.deep.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchesMock);
    });
  });
});
