import { useMemo } from "react";

export default function usePathUtils() {
  const replaceParamPath = (path: string, params: Record<string, string>) => {
    return Object.keys(params).reduce((acc, key) => {
      return acc.replace(`:${key}`, params[key]);
    }, path);
  };

  const createQueryPath = (path: string, params: Record<string, string>) => {
    const redirect = params.redirect;
    if (!redirect.length || redirect === "/" || path === redirect) {
      delete params.redirect;
    }
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      searchParams.append(key, params[key]);
    });
    return `${path}?${searchParams.toString()}`;
  };

  const utils = useMemo(
    () => ({
      replaceParamPath,
      createQueryPath,
    }),
    []
  );

  return utils;
}
