'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    userId: DataTypes.INTEGER,
    listId: DataTypes.INTEGER,
    text: { type: DataTypes.STRING, allowNull: false },
    tag: DataTypes.STRING
  }, {});
  Task.associate = function (models) {
    Task.belongsTo(models.List, { foreignKey: "listId" });
    Task.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Task;
};
