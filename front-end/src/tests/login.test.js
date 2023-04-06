import React from "react";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import Login from '../Pages/Login';
import App from "../App";
import renderWithRouter from "./helpers/renderWith";
import { act } from "react-dom/test-utils";
// import { tokenMock } from './helpers/localStorageMock';
// import { act } from 'react-dom/test-utils';

describe("Testa a página Login", () => {
  // afterEach(() => jest.clearAllMocks());
  // beforeEach(() => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(tokenMock),
  //   });
  // })

  test("Verifica se existem os elementos na tela", () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole("textbox", { name: /login :/i });
    const passwordInput = screen.getByLabelText(/senha :/i);
    const loginButton = screen.getByRole("button", { name: /login/i });
    const registerButton = screen.getByRole("button", {
      name: /ainda não tenho conta/i,
    });
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(loginButton).toBeDefined();
    expect(loginButton).toBeDisabled();
    expect(registerButton).toBeDefined();
  });

  test("Verifica se o botão de registro redireciona para /register", async () => {
    const { history } = renderWithRouter(<App />);
    const loginRegisterButton = screen.getByRole("button", {
      name: /ainda não tenho conta/i,
    });
    userEvent.click(loginRegisterButton);
    const registerButton = await screen.findByRole('button', {  name: /cadastrar/i});
    expect(registerButton).toBeInTheDocument();
  });

  test("Verifica se um email inválido desabilita o botão de login", async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole("textbox", { name: /login :/i });
    const loginButton = screen.getByRole("button", { name: /login/i });
    userEvent.type(emailInput, 'arthurdebigode2hotmail.com')
    expect(emailInput.value).toBe('arthurdebigode2hotmail.com');
  });
});
