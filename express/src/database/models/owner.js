module.exports = (db, DataTypes) =>
  db.sequelize.define("owner", {
    email: {
      type: DataTypes.STRING(254),
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
