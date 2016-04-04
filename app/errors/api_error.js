function ApiError (message, status, errors) {
  Error.captureStackTrace(this, this.constructor);
  this.name = 'ApiError';
  this.message = message;
  this.status = status;
  this.errors = errors || [];
}

ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

module.exports = ApiError;
