export type ApiErrorBody = {
  code: string;
  message: string;
  fields?: string[];
};

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: ApiErrorBody,
  ) {
    super(body.message);
  }
}

export function notFound(message: string) {
  return new ApiError(404, { code: "PROJECT_NOT_FOUND", message });
}

export function validationFailed(message: string, fields: string[]) {
  return new ApiError(400, { code: "VALIDATION_FAILED", message, fields });
}
