module.exports = (db, DataTypes) =>
    db.sequelize.define("user", {
      username: {
        type: DataTypes.STRING(32),
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING(254),
        allowNull: false
      },
      password_hash: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
    }, {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false
    });
  