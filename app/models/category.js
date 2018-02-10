module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
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
      tableName: 'categories',
      classMethods: {
        associate(models) {
          Category.hasMany(models.Company, { as: 'Companies' });
        },
      },
    }
  );
  return Category;
};
