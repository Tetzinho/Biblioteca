const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require('../schemas/usuario/novousuario.js');
const validacao = ajv.compile(schema);
const schemaUpdate = require('../schemas/usuario/atualizausuario.js');
const validacaoUpdate = ajv.compile(schemaUpdate);
const models = require('../models');
const usuario = models.usuario;
const Livro = models.livro;

exports.findAll = (request, response) => {
  usuario.findAll({ include: Livro })
    .then((data) => {
      return response.status(200).json(data);
    })
    .catch((erro) => {
      return response.status(500).json({
        message: 'erro no server' + erro.message,
      });
    });
};

exports.findOne = (request, response) => {
  let id = request.params.id;
  usuario.findByPk(id)
    .then((data) => {
      if (data) {
        return response.status(200).json(data);
      } else {
        return response.status(404).json({
          message: 'Usuário nao encontrado',
        });
      }
    })
    .catch((erro) => {
      return response.status(500).json({
        message: 'erro no server ' + erro.message,
      });
    });
};

exports.store = (request, response) => {
  let validacoes = validacao(request.body);
  if (!validacoes) {
    return response.status(400).json({
      message: validacao.errors[0].message,
    });
  }
  usuario.create(request.body)
    .then((data) => {
      return response.status(201).json(data);
    })
    .catch((erro) => {
      return response.status(500).json({
        message: 'erro no server' + erro.message,
      });
    });
};

exports.update = (request, response) => {
  let id = request.params.id;
  let validacoes = validacaoUpdate(request.body);
  if (!validacoes) {
    return response.status(400).json({
      message: validacaoUpdate.errors[0].message,
    });
  }
  usuario.findByPk(id)
    .then((data) => {
      if (data) {
        usuario.update(request.body, { where: { id: id } }).then((result) => {
          if (result) {
            usuario.findByPk(id).then((resultSearch) => {
              return response.status(200).json(resultSearch);
            });
          }
        });
      } else {
        return response.status(404).json({
          message: 'Usuário nao encontrado',
        });
      }
    })
    .catch((erro) => {
      return response.status(500).json({
        message: 'erro no server ' + erro.message,
      });
    });
};

exports.delete = (request, response) => {
  let id = request.params.id;
  usuario.findByPk(id)
    .then((data) => {
      if (data) {
        data.destroy();
        return response.status(200).json({
          message: 'Usuário excluido com sucesso',
        });
      } else {
        return response.status(404).json({
          message: 'Usuário nao encontrado',
        });
      }
    })
    .catch((erro) => {
      return response.status(500).json({
        message: 'erro no server ' + erro.message,
      });
    });
};

