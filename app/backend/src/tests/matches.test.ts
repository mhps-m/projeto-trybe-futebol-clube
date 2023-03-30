import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import Match from '../database/models/MatchModel';

import { matchesMock } from './mocks/matches.mock';
import IMatch from '../interfaces/IMatch';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração para a rota /matches', function() {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  describe('Testa a rota GET /matches, retornando todos os times cadastrados', function() {
    it('Retorna os times com sucesso', async function() {
      sinon
        .stub(Match, 'findAll')
        .resolves(matchesMock as IMatch[] & Match[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/matches');

      expect(chaiHttpResponse.status).to.deep.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchesMock);
    });
  });
});
