import { Graph } from '../types';

export function findPath(startId: string, endId: string, graph: Graph): string[] {
  const visited = new Set<string>();
  const queue: { node: string; path: string[] }[] = [{ node: startId, path: [startId] }];

  while (queue.length > 0) {
    const { node, path } = queue.shift()!;
            console.log(node);
    if (node.toLocaleLowerCase() === endId.toLocaleLowerCase()) {
      return path;
    }

    visited.add(node);

    const neighbors = graph.edges
      .filter(e => e.from === node)
      .map(e => e.to)
      .filter(n => !visited.has(n));

    neighbors.forEach(neighbor => {
      queue.push({ node: neighbor, path: [...path, neighbor] });
    });
  }

  return []; 
}