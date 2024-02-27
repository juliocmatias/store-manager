const httpMap = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 422,
  BAD_REQUEST: 400,
  UNPROCESSABLE_ENTITY: 422,
  NO_CONTENT: 204,
};

const mapStatusHTTP = (status) => httpMap[status] || 500;

module.exports = mapStatusHTTP;