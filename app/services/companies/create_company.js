const sequelize = require('../../models');
const UploaderAvatar = require('../../helpers/uploader_avatar');
const errorParse = require('../../helpers/error_parse');
const ApiError = require('../../errors/api_error');
const JwtTokenGenerator = require('../sessions/jwt_token_generator');
const shortid = require('shortid');
const app = require('../../../app');
const CompanyMailer = require('../../mailers/company_mailer');

/**
 * Upload company avatar to S3 and saving it in a specefic path.
 *
 * @param {string} avatar, the base64 that will be uploaded to S3.
 * @param {string} path, the place where the avatar will be located.
 * @param {Object} company, the instance of the current company.
 * @returns {Promise} Returns an UploaderAvatar promise.
 */
async function uploadAvatar(avatar, path, company) {
  // Initializer UploaderAvatar instance and upload company avatar
  const UploaderCompanyAvatar = new UploaderAvatar(path);

  try {
    const data = await UploaderCompanyAvatar.putImage(
      avatar,
      company.identifier,
    );
    company.avatar = data.url;
    company.avatarName = data.name;
    await company.save();
    return company;
  } catch (error) {
    await company.destroy();
    throw error;
  }
}

module.exports.call = async ({ categoryId, avatar, ...params } = {}) => {
  Object.assign(params, { identifier: shortid.generate().toLowerCase() });

  try {
    const categoryParams = { ...params };

    if (categoryId) {
      const category = await sequelize.Category.findOne({
        where: { id: categoryId },
      });

      if (!category) {
        throw new Error('Category not found.');
      }

      categoryParams.categoryId = categoryId;
    }

    const companyInstance = sequelize.Company.build(categoryParams);
    const company = await companyInstance.save();
    const token = JwtTokenGenerator.call(
      { identifier: company.identifier },
      app.get('jwtKey'),
      '100d',
    );

    const path = `companies/${company.identifier}/avatar`;

    if (avatar) {
      await uploadAvatar(avatar, path, company);
    }

    CompanyMailer.welcomeMail(company.id);

    return { result: { accessToken: token }, status: 201 };
  } catch (err) {
    throw new ApiError('Company could not be created.', 422, errorParse(err));
  }
};
