module.exports = function (errorInstance) {
  errors = [];
  switch (errorInstance.name) {
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      errorInstance.errors.forEach(function (item) {
        errors.push(item.message)
      });
      break;
    default:
      errors.push(errorInstance.message)
      break;
  }

  return errors;
}
