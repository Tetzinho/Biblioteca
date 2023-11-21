module.exports = function (models) {
    models.usuario.hasMany(models.livro, {
      foreignKey: 'id_usuario',
      onDelete: 'CASCADE',
    });
    models.livro.belongsTo(models.usuario, {
      foreignKey: 'id_usuario',
      onDelete: 'CASCADE',
    });
  };
  