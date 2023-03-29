import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import User from '../database/models/UserModel';

import { loginMock, userMock } from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

const SECRET = 'suaSenhaSecreta';

describe('Testes de integração para a rota /login', function() {
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

    expect(!!jwt.verify(chaiHttpResponse.body.token, SECRET))
      .to.deep.equal(true);
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
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it('Ao passar apenas a senha', async function() {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          password: 'senhaexemplo',
        });

      expect(chaiHttpResponse.status).to.deep.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    });
  });
});
