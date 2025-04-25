class ApiResponse {
  constructor({
    success = true,
    data = null,
    message = null,
    error = null,
  } = {}) {
    this.success = success;
    this.data = data;
    this.message = message;
    this.error = error;
  }
}

module.exports = ApiResponse;
