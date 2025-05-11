export function extractSearchParams<T extends Record<string, any>>(
  searchParams: URLSearchParams,
  params: T = {} as T
): T {
  if (searchParams && params) {
    const result = {} as Record<string, any>;
    for (const key in params) {
      const value = searchParams.get(key);
      result[key] = value || params[key];
    }
    return result as T;
  }
  return params;
}
