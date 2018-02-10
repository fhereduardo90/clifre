const sequelize = require('../models');
const app = require('../../app');
const jwt = require('jsonwebtoken');
const ApiError = require('../errors/api_error');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json(new ApiError('Token not provided.', 401));
  }

  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json(new ApiError('Token not provided.', 401));
  }

  let decoded;

  try {
    decoded = jwt.verify(token, app.get('jwtKey'));
  } catch (error) {
    return res.status(403).end();
  }

  try {
    const company = await sequelize.Company.findOne({
      where: { identifier: decoded.identifier },
      include: [{ model: sequelize.Category }],
    });

    if (!company) {
      throw new Error('Company not found');
    }

    req.company = company;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
};
