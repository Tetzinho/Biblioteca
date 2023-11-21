module.exports = (sequelize, Datatypes) => {
  const Livro = sequelize.define('livro', {
    nome: {
      type: Datatypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: Datatypes.STRING(100),
      allowNull: false,
    },
  });
  return Livro;
};
