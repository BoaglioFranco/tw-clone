export default class ApiError {
  // Handle all the posible errors in the api

  constructor(public code: number, public message: { errors: any }) {}

  static badRequest(msg: { errors: any }) {
    return new ApiError(400, msg);
  }
}
