export const ConstEnumValidator = {
  validate: <T extends Object>(
    enumObject: T,
    value: string | null | undefined
  ) => {
    if (!value) {
      return false;
    }

    if (Object.values(enumObject).includes(value.toUpperCase())) {
      return true;
    }
    return false;
  },
};
