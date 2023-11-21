module.exports = {
    type: 'object',
    properties: {
      nome: { type: 'string', minLength: 3 },
      cpf: { type: 'string', minLength: 11 },
      telefone: { type: 'string', minLength: 11 },
      email: { type: 'string', minLength: 6 },
      },
    required: ['nome', 'cpf', 'telefone', 'email'],
    additionalProperties: false,
  };
  