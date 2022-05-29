class HttpError extends Error {
  constructor(message) {
    super(message); // Adds a "message" property
    this.code = error.code; // Adds a "code" property
  }
}

module.exports = HttpError;
