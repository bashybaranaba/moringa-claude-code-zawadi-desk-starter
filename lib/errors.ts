export type ApiErrorBody = {
  code: string;
  message: string;
  fields?: string[];
};

export function validationFailed(message: string, fields: string[]) {
  return { code: "VALIDATION_FAILED", message, fields } satisfies ApiErrorBody;
}
