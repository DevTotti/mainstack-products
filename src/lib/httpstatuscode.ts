// Define an object to hold common HTTP status codes for easier reference
export const statusCode = {
  OK: 200, // Status code for a successful request
  CREATED: 201, // Status code for a resource successfully created
  BAD_REQUEST: 400, // Status code for a request with invalid syntax or parameters
  UNAUTHORIZED: 401, // Status code for failed authentication or missing credentials
  FORBIDDEN: 403, // Status code for requests that are understood but not permitted
  NOT_FOUND: 404, // Status code for a resource that could not be found
  UNPROCESSABLE_ENTITY: 422, // Status code for a request that is syntactically correct but semantically invalid
  SERVER_ERROR: 500, // Status code for a generic server-side error
};
