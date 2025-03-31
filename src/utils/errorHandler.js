import { isCelebrateError } from "celebrate";

export const errorHandler = {
    handleError() {
      const handleValidationError = (err, req, res, next) => {
        const code = 400;
        let details = [];
        if (err.details) {
          err.details.forEach((error) => {
            details.push({
              message: error.message,
              key: error.context?.key,
            });
          });
        }
        
        return res.status(code).json({
          success: false,
          message: JSON.stringify(details),
          data: {},
        });
      };
  
      return (err, req, res, next) => {
        if (isCelebrateError(err) || err.IsValidation)
          handleValidationError(err, req, res, next);
      };
    },
  };
  