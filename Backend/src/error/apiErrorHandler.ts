import { ErrorRequestHandler } from "express";
import ApiError from "./apiError";

const apiErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.code).json(err.message.errors);
  }

  return res.status(500).json("Something gone wrong :(");
};
