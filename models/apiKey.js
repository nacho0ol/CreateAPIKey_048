// models/apiKey.js

module.exports = (sequelize, DataTypes) => {
  const ApiKey = sequelize.define("ApiKey", {
    key_value: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return ApiKey;
};
