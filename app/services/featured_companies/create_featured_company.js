// Libs
const sequelize = require('../../models');
const UploaderAvatar = require('../../helpers/uploader_avatar');
// Helpers
const errorParse = require('../../helpers/error_parse');
// Others
const ApiError = require('../../errors/api_error');
const Promise = require('bluebird');
// Serializers
const FeaturedCompanyDetailSerializer = require('../../serializers/featured_companies/feature_company_detail');
const CompanyDetailSerializer = require('../../serializers/companies/company_detail');

function uploadImage(image, path, entity) {
  const UploadFeaturedCompanyImage = new UploaderAvatar(path);
  return UploadFeaturedCompanyImage.putImage(image, entity.id)
    .then((data) => {
      return entity.update({ image: data.url });
    })
    .catch((err) => {
      entity.destroy();
      UploadFeaturedCompanyImage.deleteImage(entity.avatarName);
      throw err;
    });
}

/* eslint arrow-body-style: "off" */
module.exports.call = (params) => {
  return Promise.try(() => {
    try {
      let companyFound;
      return sequelize.Company.findOne({ where: { id: params.companyId } })
        .then((company) => {
          if (!company) {
            throw new Error('Company not found.');
          }
          companyFound = company;
          return sequelize.FeaturedCompany.create({ companyId: companyFound.id });
        })
        .then((featuredCompany) => {
          if (params.image) {
            return uploadImage(
              params.image,
              `featured-companies/${featuredCompany.id}/images`,
              featuredCompany
            );
          }
          return Promise.resolve(featuredCompany);
        })
        .then((featuredCompany) => {
          return {
            result: Object.assign(
              {},
              FeaturedCompanyDetailSerializer.serialize(featuredCompany),
              { company: CompanyDetailSerializer.serialize(companyFound) }
            ),
            status: 201,
          };
        })
        .catch((err) => {
          throw new ApiError('Featured Card could not be created.', 422, errorParse(err));
        });
    } catch (err) {
      throw new ApiError('Featured Card could not be created.', 422, errorParse(err));
    }
  });
};
