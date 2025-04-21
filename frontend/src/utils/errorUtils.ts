export function setError(field: string, error: { message: string }): void {
    console.error(`Error in field "${field}": ${error.message}`);
  }