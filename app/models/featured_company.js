module.exports = (sequelize, DataTypes) => {
  const FeaturedCompany = sequelize.define(
    'FeaturedCompany',
    {
      image: {
        type: DataTypes.STRING,
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'company_id',
        validate: {
          isInt: {
            msg: 'companyId must be an integer',
          },
          isUnique: async (value, next) => {
            try {
              if (!value) {
                return next();
              }

              if (!this.isNewRecord && this.companyId === value) {
                return next();
              }

              const fc = await FeaturedCompany.findOne({ where: { companyId: value } });

              if (fc) {
                return next('companyId has been already taken.');
              }

              return next();
            } catch (error) {
              return next(error.message);
            }
          },
          presence: async (value, next) => {
            try {
              if (!this.isNewRecord && this.companyId === value) {
                return next();
              }

              const company = await sequelize.models.Company.findOne({ where: { id: value } });

              if (!company) {
                return next('Company not found.');
              }

              return next();
            } catch (error) {
              return next(error.message);
            }
          },
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
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
    }
  );
  return FeaturedCompany;
};
