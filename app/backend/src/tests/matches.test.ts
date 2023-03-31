import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import Match from '../database/models/MatchModel';

import { matchesMock } from './mocks/matches.mock';
import IMatch from '../interfaces/IMatch';
import User from '../database/models/UserModel';
import { loginMock, userMock } from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração para a rota /matches', function() {
  let chaiHttpResponse: Response;
  let getToken: Response;

  afterEach(sinon.restore);

  describe('Testa a rota GET /matches, retornando todos os times cadastrados', function() {
    it('Retorna as partidas com sucesso', async function() {
      sinon
        .stub(Match, 'findAll')
        .resolves(matchesMock as IMatch[] & Match[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/matches');

      expect(chaiHttpResponse.status).to.deep.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchesMock);
    });

    it('Retorna as partidas finalizadas', async function() {
      sinon
        .stub(Match, 'findAll')
        .resolves(matchesMock as IMatch[] & Match[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=false');

      expect(chaiHttpResponse.status).to.deep.equal(200);
      expect(chaiHttpResponse.body[0].inProgress).to.deep.equal(false);
    });

    it('Retorna as partidas em progresso', async function() {
      sinon
        .stub(Match, 'findAll')
        .resolves(matchesMock as IMatch[] & Match[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true');

      expect(chaiHttpResponse.status).to.deep.equal(200);
      expect(chaiHttpResponse.body[0].inProgress).to.deep.equal(true);
    });
  });

  describe('Testa a rota POST /matches/:id/finish, permitindo encerrar uma partida em andamento', function() {
    it('Encerra uma partida com sucesso', async function() {
      sinon
        .stub(User, 'findOne')
        .resolves(userMock as User);

      getToken = await chai
        .request(app)
        .post('/login')
        .send(loginMock);

      const { body: { token } } = getToken;

      sinon
        .stub(Match, 'findByPk')
        .resolves(matchesMock[0] as IMatch & Match);

      sinon
        .stub(Match, 'update')
        .resolves([1]);

      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish')
        .set('authorization', token);

      expect(chaiHttpResponse.status).to.deep.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Finished' });
    });

    it('Retorna erro ao tentar finalizar uma partida sem passar um token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish');

      expect(chaiHttpResponse.status).to.deep.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token not found' });
    });

    it('Retorna erro ao passar um token inválido', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish')
        .set('authorization', 'invalidToken');

      expect(chaiHttpResponse.status).to.deep.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token must be a valid token' });
    });

    it('Retorna erro ao tentar finalizar uma partida já finalizada', async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(userMock as User);

      getToken = await chai
        .request(app)
        .post('/login')
        .send(loginMock);

      const { body: { token } } = getToken;

      sinon
        .stub(Match, 'findByPk')
        .resolves(matchesMock[1] as IMatch & Match);

      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/2/finish')
        .set('authorization', token);

      expect(chaiHttpResponse.status).to.deep.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Match not found or already finished' });
    });

    it('Retorna erro ao tentar finalizar uma partida inexistente', async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(userMock as User);

      getToken = await chai
        .request(app)
        .post('/login')
        .send(loginMock);

      const { body: { token } } = getToken;

      sinon
        .stub(Match, 'findByPk')
        .resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/99/finish')
        .set('authorization', token);

      expect(chaiHttpResponse.status).to.deep.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Match not found or already finished' });
    });
  });

  describe('Testa a rota PATCH /matches/:id, permitindo atualizar o placar de uma partida em andamento', function() {
    it('Atualiza uma partida em andamento com sucesso', async function() {
      sinon
        .stub(User, 'findOne')
        .resolves(userMock as User);

      getToken = await chai
        .request(app)
        .post('/login')
        .send(loginMock);

      const { body: { token } } = getToken;

      sinon
        .stub(Match, 'findByPk')
        .resolves(matchesMock[0] as IMatch & Match);

      sinon
        .stub(Match, 'update')
        .resolves([1]);

      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1')
        .set('authorization', token)
        .send({
          homeTeamGoals: 3,
          awayTeamGoals: 4,
        });

      expect(chaiHttpResponse.status).to.deep.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Updated' });
    });

    it('Retorna erro ao tentar atualizar uma partida sem passar um token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/');

      expect(chaiHttpResponse.status).to.deep.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token not found' });
    });

    it('Retorna erro ao passar um token inválido', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/')
        .set('authorization', 'invalidToken');

      expect(chaiHttpResponse.status).to.deep.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token must be a valid token' });
    });

    it('Retorna erro ao tentar atualizar uma partida sem passar um novo valor de placar para um dos times', async function() {
      sinon
        .stub(User, 'findOne')
        .resolves(userMock as User);

      getToken = await chai
        .request(app)
        .post('/login')
        .send(loginMock);

      const { body: { token } } = getToken;

      sinon
        .stub(Match, 'findByPk')
        .resolves(matchesMock[0] as IMatch & Match);

      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1')
        .set('authorization', token);

      expect(chaiHttpResponse.status).to.deep.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Missing a new goal value to at least one of the teams' });
    });

    it('Retorna erro ao tentar atualizar uma partida já finalizada', async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(userMock as User);

      getToken = await chai
        .request(app)
        .post('/login')
        .send(loginMock);

      const { body: { token } } = getToken;

      sinon
        .stub(Match, 'findByPk')
        .resolves(matchesMock[1] as IMatch & Match);

      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/2/')
        .set('authorization', token)
        .send({
          homeTeamGoals: 5,
        });

      expect(chaiHttpResponse.status).to.deep.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Match not found or already finished' });
    });

    it('Retorna erro ao tentar atualizar uma partida inexistente', async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(userMock as User);

      getToken = await chai
        .request(app)
        .post('/login')
        .send(loginMock);

      const { body: { token } } = getToken;

      sinon
        .stub(Match, 'findByPk')
        .resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/99/')
        .set('authorization', token)
        .send({
          homeTeamGoals: 5,
        });

      expect(chaiHttpResponse.status).to.deep.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Match not found or already finished' });
    });
  });
});
