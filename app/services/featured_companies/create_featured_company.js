const models = require('../../models');
const UploaderAvatar = require('../../helpers/uploader_avatar');
const errorParse = require('../../helpers/error_parse');
const ApiError = require('../../errors/api_error');
const FeaturedCompanyDetailSerializer = require('../../serializers/featured_companies/feature_company_detail');
const CompanyDetailSerializer = require('../../serializers/companies/company_detail');
const CategoryDetailSerializer = require('../../serializers/categories/category_detail');
const CountryDetailSerializer = require('../../serializers/countries/country_detail');

async function uploadImage(image, path, id) {
  try {
    const UploadFeaturedCompanyImage = new UploaderAvatar(path);
    const { url } = await UploadFeaturedCompanyImage.putImage(image, id);
    return url;
  } catch (error) {
    throw error;
  }
}

module.exports.call = async ({ companyId, image }) => {
  const transaction = await models.sequelize.transaction();

  try {
    const featuredCompany = models.FeaturedCompany.build({ companyId });
    const isInvalid = await featuredCompany.validate();

    if (isInvalid) {
      throw isInvalid;
    }

    await featuredCompany.save({ transaction });
    const company = await featuredCompany.getCompany({
      include: [{ model: models.Category }, { model: models.Country }],
    });
    const category = company.Category;
    const country = company.Country;

    const imageUrl = await uploadImage(
      image,
      `featured-companies/${featuredCompany.id}/images`,
      featuredCompany.id
    );

    await featuredCompany.update({ image: imageUrl }, { transaction });
    transaction.commit();

    return {
      result: {
        ...FeaturedCompanyDetailSerializer.serialize(featuredCompany),
        company: {
          ...CompanyDetailSerializer.serialize(company),
          ...(category
            ? { category: CategoryDetailSerializer.serialize(category) }
            : {}),
          ...(country
            ? { country: CountryDetailSerializer.serialize(country) }
            : {}),
        },
      },
      status: 201,
    };
  } catch (err) {
    transaction.rollback();
    throw new ApiError(
      'Featured Company could not be created.',
      422,
      errorParse(err)
    );
  }
};
