export type Permutations<
  T extends string,
  U extends string,
> = T extends `${infer Head}${infer Tail}`
  ? Tail extends U
    ? Permutations<Tail, U>
    : `${Head},${Permutations<Tail, U>}`
  : '';
