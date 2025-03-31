import HttpStatus from "http-status-codes";
export const sendSuccessResponse = (
  res,
  data,
  messages,
  statusCode = HttpStatus.OK
) => {
  const message = messages;
  res.status(statusCode).json({
    success: true,
    message: message,
    data,
  });
};

export const sendErrorResponse = (
  res,
  data = [],
  messages,
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR
) => {
  const message = messages;
  res.status(statusCode).json({
    success: false,
    message: message,
    data: data,
  });
};
