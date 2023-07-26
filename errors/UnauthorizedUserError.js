module.exports = class UnauthorizedUserError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};
