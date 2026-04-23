export const distinctBy = <T, K>(arr: T[], key: (item: T) => K): T[] =>
  Array.from(new Map(arr.map((item) => [key(item), item])).values());
