const sequelize = require('../../models');
const errorParse = require('../../helpers/error_parse');
const FeaturedCompanyDetailSerializer = require('../../serializers/featured_companies/feature_company_detail');
const CompanyDetailSerializer = require('../../serializers/companies/company_detail');
const CategoryDetailSerializer = require('../../serializers/categories/category_detail');
const CountryDetailSerializer = require('../../serializers/countries/country_detail');
const ApiError = require('../../errors/api_error');

module.exports.call = async () => {
  try {
    const featuredCompanies = await sequelize.FeaturedCompany.findAll({
      order: '"createdAt" DESC',
      include: [
        {
          model: sequelize.Company,
          include: [
            { model: sequelize.Category },
            { model: sequelize.Country },
          ],
        },
      ],
    });

    return {
      result: [
        ...featuredCompanies.map(({ Company = {}, Company: { Category, Country } = {}, ...fc }) => ({
          ...FeaturedCompanyDetailSerializer.serialize(fc),
          company: {
            ...CompanyDetailSerializer.serialize(Company),
            ...(Category
              ? { category: CategoryDetailSerializer.serialize(Category) }
              : {}),
            ...(Country
              ? { country: CountryDetailSerializer.serialize(Country) }
              : {}),
          },
        })),
      ],
      status: 200,
    };
  } catch (err) {
    throw new ApiError('Featured Companies not found.', 422, errorParse(err));
  }
};
