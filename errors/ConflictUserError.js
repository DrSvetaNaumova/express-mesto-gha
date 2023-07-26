module.exports = class ConflictUserError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
};
