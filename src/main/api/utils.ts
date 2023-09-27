export function returnValue<Value = string>(
  value: Value,
  otherData?: Record<string, any>
) {
  return {
    code: 200,
    value,
    ...otherData,
  };
}

export function returnError<Error = string>(error: Error) {
  return {
    code: 0,
    error,
  };
}
