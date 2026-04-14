export function getPolygonCenter(points: string): { x: number; y: number } {
  const coords = points
    .trim()
    .split(" ")
    .reduce<number[][]>((acc, val, i, arr) => {
      if (i % 2 === 0) {
        acc.push([Number(val), Number(arr[i + 1])]);
      }
      return acc;
    }, []);

  const x = coords.reduce((sum, [x]) => sum + x, 0) / coords.length;
  const y = coords.reduce((sum, [, y]) => sum + y, 0) / coords.length;

  return { x, y };
}
