export type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};

export function handleError(status: number, data?: unknown): ApiError {
  let message = "Something went wrong";

  switch (status) {
    case 400:
      message = "Bad Request - Please check your input";
      break;
    case 401:
      message = "Unauthorized - Please login again";
      break;
    case 403:
      message = "Forbidden - You don't have permission to access this resource";
      break;
    case 404:
      message = "Not Found - The requested resource was not found";
      break;
    case 500:
      message = "Internal Server Error - Please try again later";
      break;
    default:
      if (status >= 400 && status < 500) {
        message = "Client Error - Please check your request";
      } else if (status >= 500) {
        message = "Server Error - Please try again later";
      }
  }

  if (data && typeof data === "object") {
    const dataObj = data as Record<string, unknown>;
    if (typeof dataObj.message === "string" && dataObj.message) {
      message = dataObj.message;
    } else if (typeof dataObj.error === "string" && dataObj.error) {
      message = dataObj.error;
    }
  }

  return {
    status,
    message,
    details: data,
  };
}
