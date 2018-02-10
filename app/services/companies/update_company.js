const errorParse = require('../../helpers/error_parse');
const ApiError = require('../../errors/api_error');
const UploaderAvatar = require('../../helpers/uploader_avatar');
const CompanyDetailSerializer = require('../../serializers/companies/company_detail');
const CategoryDetailSerializer = require('../../serializers/categories/category_detail');
const CountryDetailSerializer = require('../../serializers/countries/country_detail');

/**
 * Upload company avatar to S3 and saving it in a specefic path.
 *
 * @param {string} avatar, the base64 that will be uploaded to S3.
 * @param {string} path, the place where the avatar will be located.
 * @param {Object} company, the instance of the current company.
 * @returns {Promise} Returns an UploaderAvatar promise.
 */
async function uploadAvatar(avatar, path, company) {
  const UploaderCompanyAvatar = new UploaderAvatar(path);

  try {
    const data = await UploaderCompanyAvatar.putImage(avatar, company.identifier);
    await company.update(
      { avatar: data.url, avatarName: data.name },
      { fields: ['avatar', 'avatarName'] }
    );
    return company;
  } catch (err) {
    throw err;
  }
}

module.exports.call = async (company, { avatar, ...params } = {}) => {
  try {
    await company.update(params);
    const category = await company.getCategory();
    const country = await company.getCountry();

    if (avatar) {
      const path = `companies/${company.identifier}/avatar`;
      await uploadAvatar(avatar, path, company);
    }

    return {
      result: {
        ...CompanyDetailSerializer.serialize(company),
        ...(category
          ? {
            category: CategoryDetailSerializer.serialize(category),
          }
          : {}),
        ...(country
          ? {
            country: CountryDetailSerializer.serialize(country),
          }
          : {}),
      },
      status: 200,
      success: true,
    };
  } catch (error) {
    throw new ApiError('Company could not be updated.', 422, errorParse(error));
  }
};
