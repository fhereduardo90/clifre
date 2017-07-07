module.exports = (sequelize, DataTypes) => {
  const FeaturedCompany = sequelize.define('FeaturedCompany', {
    image: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    underscored: true,
    tableName: 'featured_companies',
    classMethods: {
      associate(models) {
        FeaturedCompany.belongsTo(models.Company, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false,
            name: 'companyId',
            field: 'company_id',
          },
        });
      },
    },
  });
  return FeaturedCompany;
};
