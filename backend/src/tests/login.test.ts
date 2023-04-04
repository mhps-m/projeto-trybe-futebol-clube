import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import Auth from '../auth/Auth';
import { app } from '../app';
import { User } from '../database/models';

import {
  loginMock,
  userMock,
  loginErrors,
  invalidEmailMock,
  invalidEmailLoginMock,
  invalidPasswordMock,
  invalidPasswordLoginMock,
} from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração para a rota /login', function() {
  describe('Testa a rota POST /login', function() {
    let chaiHttpResponse: Response;

    afterEach(sinon.restore);

    it('Testa se é possível fazer login com sucesso', async function() {
      sinon
        .stub(User, 'findOne')
        .resolves(userMock as User);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          ...loginMock,
        });

      expect(chaiHttpResponse.status).to.deep.equal(200);
      expect(typeof chaiHttpResponse.body.token).to.deep.equal('string');

      expect(Auth.authenticateToken(chaiHttpResponse.body.token))
        .to.deep.equal(loginMock);
    });

    describe('Testa se retorna erro ao passar dados incompletos', function() {
      it('Ao passar apenas o email', async function() {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: 'email@email.com',
          });

        expect(chaiHttpResponse.status).to.deep.equal(400);
        expect(chaiHttpResponse.body).to.deep.equal({ message: loginErrors.missingFields });
      });

      it('Ao passar apenas a senha', async function() {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            password: 'senhaexemplo',
          });

        expect(chaiHttpResponse.status).to.deep.equal(400);
        expect(chaiHttpResponse.body).to.deep.equal({ message: loginErrors.missingFields });
      });
    });

    describe('Testa se retorna erro ao passar dados incorretos', function() {
      it('Ao passar email inexistente', async function() {
        sinon
          .stub(User, 'findOne')
          .resolves(null);

        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: 'email@inexistente.com',
            password: 'senha123',
          });

        expect(chaiHttpResponse.status).to.deep.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({ message: loginErrors.invalidFields });
      });

      it('Ao passar email correto com formato inválido', async function() {
        sinon
          .stub(User, 'findOne')
          .resolves({ ...invalidEmailMock } as User);

        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send(invalidEmailLoginMock);

        expect(chaiHttpResponse.status).to.deep.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({ message: loginErrors.invalidFields });
      });

      it('Ao passar senha incorreta', async function() {
        sinon
          .stub(User, 'findOne')
          .resolves(userMock as User);

        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: userMock.email,
            password: 'senhaIncorreta',
          });

        expect(chaiHttpResponse.status).to.deep.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({ message: loginErrors.invalidFields });
      });

      it('Ao passar senha correta com formato inválido', async function() {
        sinon
          .stub(User, 'findOne')
          .resolves(invalidPasswordMock as User);

        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send(invalidPasswordLoginMock);

        expect(chaiHttpResponse.status).to.deep.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({ message: loginErrors.invalidFields });
      });
    });
  });

  describe('Testes de integração para a rota GET /login/role', function() {
    let chaiHttpResponse: Response;
    let getToken: Response;

    afterEach(sinon.restore);

    describe('Retorna a "role" do usuário autenticado', function() {
      it('Testa se é possível receber a role com sucesso', async function() {
        sinon
          .stub(User, 'findOne')
          .resolves(userMock as User);

        getToken = await chai
          .request(app)
          .post('/login')
          .send(loginMock);

        const { body: { token } } = getToken;

        expect(typeof token).to.deep.equal('string');

        chaiHttpResponse = await chai
          .request(app)
          .get('/login/role')
          .set('authorization', token);

        expect(chaiHttpResponse.status).to.deep.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal({ role: userMock.role });
      });

      it('Testa se retorna erro ao não passar um token', async function() {
        chaiHttpResponse = await chai
          .request(app)
          .get('/login/role');

        expect(chaiHttpResponse.status).to.deep.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({ message: loginErrors.missingToken });
      });

      it('Testa se retorna erro ao passar token inválido', async function() {
        sinon
          .stub(User, 'findOne')
          .resolves(null);

        chaiHttpResponse = await chai
          .request(app)
          .get('/login/role')
          .set('authorization', 'invalidToken');

        expect(chaiHttpResponse.status).to.deep.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({ message: loginErrors.invalidToken });
      });
    });
  });
});
