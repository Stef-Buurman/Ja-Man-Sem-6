import type { Graph } from "../Types/types";
import type { GraphNode } from "../Types/types";

export function findPath(startId: string, endId: string, graph: Graph): string[] {
  const visited = new Set<string>();
  const queue: { node: string; path: string[] }[] = [{ node: startId, path: [startId] }];

  while (queue.length > 0) {
    const { node, path } = queue.shift()!;
    if (node.toLocaleLowerCase() === endId.toLocaleLowerCase()) {
      return path;
    }

    visited.add(node);

    const neighbors = graph.edges
      .filter((e) => e.from === node || e.to === node)
      .map((e) => (e.from === node ? e.to : e.from))
      .filter((n) => !visited.has(n));

    neighbors.forEach((neighbor) => {
      queue.push({ node: neighbor, path: [...path, neighbor] });
    });
  }

  return [];
}

export function buildAdjacencyMap(graph: Graph) {
  const map = new Map<string, string[]>();

  graph.nodes.forEach((n) => map.set(n.id, []));

  graph.edges.forEach((e) => {
    if (!map.has(e.from)) map.set(e.from, []);
    if (!map.has(e.to)) map.set(e.to, []);

    map.get(e.from)?.push(e.to);
    map.get(e.to)?.push(e.from);
  });

  return map;
}

export function distance(a: GraphNode, b: GraphNode) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function heuristic(a: GraphNode, b: GraphNode) {
  return distance(a, b);
}

export function getEdgeCost(from: GraphNode, to: GraphNode) {
  let cost = distance(from, to);

  if (to.type === "door") cost += 5;
  if (to.type === "stairs") cost += 20;
  if (to.type === "elevator") cost += 10;

  if (from.floor !== to.floor) cost += 50;

  return cost;
}

export function getNode(graph: Graph, id: string): GraphNode | undefined {
  return graph.nodes.find((n) => n.id === id);
}

export function getDoorsForRoom(graph: Graph, roomId: string): GraphNode[] {
  return graph.nodes.filter((n) => n.type === "door" && n.roomId === roomId);
}

export function getNeighbors(id: string, adjacency: Map<string, string[]>) {
  return adjacency.get(id) || [];
}

export function reconstructPath(cameFrom: Map<string, string>, current: string): string[] {
  const path = [current];

  while (cameFrom.has(current)) {
    current = cameFrom.get(current)!;
    path.unshift(current);
  }

  return path;
}

export function findPathAStar(startId: string, endId: string, graph: Graph): string[] {
  const adjacency = buildAdjacencyMap(graph);

  const openSet = new Set<string>([startId]);
  const cameFrom = new Map<string, string>();

  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();

  graph.nodes.forEach((n) => {
    gScore.set(n.id, Infinity);
    fScore.set(n.id, Infinity);
  });

  gScore.set(startId, 0);

  const startNode = getNode(graph, startId);
  const endNode = getNode(graph, endId);
  if (!startNode || !endNode) {
    return [];
  }

  fScore.set(startId, heuristic(startNode, endNode));

  while (openSet.size > 0) {
    let current = [...openSet].reduce((a, b) => (fScore.get(a)! < fScore.get(b)! ? a : b));

    if (current === endId) {
      return reconstructPath(cameFrom, current);
    }

    openSet.delete(current);

    const currentNode = getNode(graph, current);
    if (!currentNode) continue;

    for (const neighborId of getNeighbors(current, adjacency)) {
      const neighborNode = getNode(graph, neighborId);
      if (!neighborNode) continue;

      const tentativeG = gScore.get(current)! + getEdgeCost(currentNode, neighborNode);

      if (tentativeG < gScore.get(neighborId)!) {
        cameFrom.set(neighborId, current);

        gScore.set(neighborId, tentativeG);
        fScore.set(neighborId, tentativeG + heuristic(neighborNode, endNode));

        openSet.add(neighborId);
      }
    }
  }

  return [];
}

export function findPathAStarMultiStart(startIds: string[], endId: string, graph: Graph): string[] {
  const adjacency = buildAdjacencyMap(graph);

  const tryFindPath = (targetId: string): string[] => {
    const openSet = new Set<string>(startIds);
    const cameFrom = new Map<string, string>();

    const gScore = new Map<string, number>();
    const fScore = new Map<string, number>();

    graph.nodes.forEach((n) => {
      gScore.set(n.id, Infinity);
      fScore.set(n.id, Infinity);
    });

    const endNode = getNode(graph, targetId);
    if (!endNode) {
      return [];
    }

    for (const startId of startIds) {
      const startNode = getNode(graph, startId);
      if (!startNode) continue;

      gScore.set(startId, 0);
      fScore.set(startId, heuristic(startNode, endNode));
    }

    while (openSet.size > 0) {
      const current = [...openSet].reduce((a, b) => (fScore.get(a)! < fScore.get(b)! ? a : b));

      if (current === targetId) {
        return reconstructPath(cameFrom, current);
      }

      openSet.delete(current);

      const currentNode = getNode(graph, current);
      if (!currentNode) continue;

      for (const neighborId of getNeighbors(current, adjacency)) {
        const neighborNode = getNode(graph, neighborId);
        if (!neighborNode) continue;

        const tentativeG = gScore.get(current)! + getEdgeCost(currentNode, neighborNode);

        if (tentativeG < gScore.get(neighborId)!) {
          cameFrom.set(neighborId, current);
          gScore.set(neighborId, tentativeG);
          fScore.set(neighborId, tentativeG + heuristic(neighborNode, endNode));
          openSet.add(neighborId);
        }
      }
    }

    return [];
  };

  const doors = getDoorsForRoom(graph, endId);

  for (const door of doors) {
    const path = tryFindPath(door.id);
    if (path.length > 0) {
      return path;
    }
  }
  // const doorPath = tryFindPath(endId + "_door");
  // if (doorPath.length > 0) {
  //   return doorPath;
  // }

  // const normalPath = tryFindPath(endId);
  // if (normalPath.length > 0) {
  //   return normalPath;
  // }

  return [];
}
