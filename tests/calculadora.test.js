const calculadora = require("../models/calculadora.js");

test("somar 2+2 deve voltar 4", () => {
  const result = calculadora.calcBasico(2, 2, "+");

  expect(result).toBe(4);
});

test("somar 5+100 deve voltar 105", () => {
  const result = calculadora.calcBasico(5, 100, "+");

  expect(result).toBe(105);
});

test("somar 'banana' + 100 deve voltar Erro", () => {
  const result = calculadora.calcBasico("banana", 100, "+");

  expect(result).toBe("Erro");
});

test("subtrair 3 - 1 deve voltar 2", () => {
  const result = calculadora.calcBasico(3, "1", "-");

  expect(result).toBe(2);
});

test('subtrair "10" - 8 deve voltar 2', () => {
  const result = calculadora.calcBasico("10", 8, "-");

  expect(result).toBe(2);
});

test("multiplicar 30 * 3 deve voltar 90", () => {
  const result = calculadora.calcBasico(30, 3, "*");

  expect(result).toBe(90);
});

test("dividir 12 / 4 deve voltar 3", () => {
  const result = calculadora.calcBasico(12, 4, "/");

  expect(result).toBe(3);
});

test("dividir 9 / 0 deve voltar Erro", () => {
  const result = calculadora.calcBasico(9, 0, "/");

  expect(result).toBe("Erro");
});
