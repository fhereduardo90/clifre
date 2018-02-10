module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define(
    'Country',
    {
      name: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: sequelize.literal('NOW()'),
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'countries',
      classMethods: {
        associate(models) {
          Country.hasMany(models.Company, { as: 'Companies' });
        },
      },
    }
  );
  return Country;
};
