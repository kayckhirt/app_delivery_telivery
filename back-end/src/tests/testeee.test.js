const { sequelize } = require('../database/models');
const { exec } = require('child_process');
const chai = require('chai');
const mocha = require('mocha');
const sinon = require('sinon');
const User = require('../database/models/User.model')
const chaiHttp = require('chai-http');
const expect = chai.expect;
const request = chai.request;
const jwt = require('jsonwebtoken');

const app = require('../api/app')
chai.use(chaiHttp);


const oneUser = {
  id: 3,
  name: "Cliente Zé Birita",
  email: "zebirita@email.com",
  role: "customer",
}

describe('Testa users', function () {

  it('Retorna o token caso o email esteja cadastrado!', async function () {
    const inputLogin = {
      email: 'zebirita@email.com',
      password: '$#zebirita#$'
    }
    const response = await chai
      .request(app)
      .post('/login')
      .send(inputLogin);
      
      delete response.body.token

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(oneUser);
  });

  it('Retorna erro caso o email não esteja cadastrado!', async function () {
    const inputLogin = {
      email: 'jaodasneves@gmail.com',
      password: '12345678'
    };

    const response = await chai
    .request(app)
    .post('/login')
    .send(inputLogin);
    delete response.body.token

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({
      "message": "Email e/ou senha inválidos"
    });
  });

  it('Testa se é possível registrar um usuario com sucesso.', async function() {
    const inputRegister = {
      name: 'Arthur BigodeFino',
      email: 'arthurbigodefino@email.com',
      password: '12345678',
      role: 'costumer'
    };

    const response = await chai
    .request(app)
    .post('/register')
    .send(inputRegister);

    expect(response.status).to.be.equal(201);
  });

  it('Testa se não é possível registrar um usuario sem name', async function() {
    const inputWithoutName = {
      email: 'ar@email.com',
      password: '12345678',
      role: 'costumer'
    };
    const responseWithoutName = await chai
    .request(app)
    .post('/register')
    .send(inputWithoutName);

    expect(responseWithoutName.status).to.be.equal(500);
  });

  it('Testa se não é possível registrar um usuario sem email.', async function() {
    const inputWithoutEmail = {
      name: 'Ronaldo Ronaldinho Ronaldao',
      password: '12345678',
      role: 'costumer'
    };
    const responseWithoutEmail = await chai
    .request(app)
    .post('/register')
    .send(inputWithoutEmail);

    expect(responseWithoutEmail.status).to.be.equal(500);
  });

  it('Pega todos os vendedores', async function() {
      const outPut = [{
        id: 2,
        name: "Fulana Pereira",
        email: "fulana@deliveryapp.com",
        password: "3c28d2b0881bf46457a853e0b07531c6",
        role: "seller"
      }];
  
      const response = await chai
      .request(app)
      .get('/users/sellers')
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(outPut);
    });
  });

