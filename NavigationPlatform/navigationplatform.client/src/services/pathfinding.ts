import type { GraphDto, GraphNodeDto } from "../api/data-contracts";
import type { PathfindingSettings } from "../Types/types";
import { GetNodeTypeFromInteger } from "../utils/NodeTypeFromType";

export function findPath(startId: string, endId: string, graph: GraphDto): string[] {
  const visited = new Set<string>();
  const queue: { node: string; path: string[] }[] = [{ node: startId, path: [startId] }];

  while (queue.length > 0) {
    const { node, path } = queue.shift()!;
    if (node.toLocaleLowerCase() === endId.toLocaleLowerCase()) {
      return path;
    }

    visited.add(node);

    const neighbors = graph.edges
      ?.filter((e) => e.from === node || e.to === node)
      .map((e) => (e.from === node ? e.to : e.from))
      .filter((n) => !visited.has(n ?? ""));

    if (neighbors) {
      neighbors
        .filter((n): n is string => !!n)
        .forEach((neighbor) => {
          queue.push({ node: neighbor, path: [...path, neighbor] });
        });
    }
  }

  return [];
}

export function buildAdjacencyMap(graph: GraphDto, settings: PathfindingSettings): Map<string, string[]> {
  const map = new Map<string, string[]>();
  let nodes = graph.nodes;
  if (settings.accessibleRoute) nodes = nodes?.filter((n) => GetNodeTypeFromInteger(n.type) !== "stairs") ?? null;
  nodes?.forEach((n) => n.id && map.set(n.id, []));

  graph.edges?.forEach((e) => {
    if (e.from && !map.has(e.from)) map.set(e.from, []);
    if (e.to && !map.has(e.to)) map.set(e.to, []);

    if (e.from && e.to) {
      map.get(e.from)?.push(e.to);
      map.get(e.to)?.push(e.from);
    }
  });

  return map;
}

export function distance(a: GraphNodeDto, b: GraphNodeDto) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function heuristic(a: GraphNodeDto, b: GraphNodeDto) {
  return distance(a, b);
}

export function getEdgeCost(from: GraphNodeDto, to: GraphNodeDto) {
  let cost = distance(from, to);

  if (GetNodeTypeFromInteger(to.type) === "door") cost += 5;
  if (GetNodeTypeFromInteger(to.type) === "stairs") cost += 20;
  if (GetNodeTypeFromInteger(to.type) === "elevator") cost += 20;

  if (from.floor !== to.floor) cost += 50;

  return cost;
}

export function getNode(graph: GraphDto, id: string): GraphNodeDto | undefined {
  return graph.nodes?.find((n) => n.id === id);
}

export function getDoorIdsForRoom(graph: GraphDto, roomId: string): string[] {
  return (
    graph.nodes
      ?.filter((n) => GetNodeTypeFromInteger(n.type) === "door" && n.roomId === roomId)
      ?.map((n) => n.id)
      .filter((id): id is string => !!id) || []
  );
}

export function getNeighbors(
  id: string,
  adjacency: Map<string, string[]>,
  settings: PathfindingSettings,
  graph: GraphDto,
): string[] {
  if (settings.accessibleRoute) {
    const neighbors = adjacency.get(id) || [];
    return neighbors.filter((neighborId) => {
      const neighborNode = getNode(graph, neighborId);
      const currentNode = getNode(graph, id);
      return (
        neighborNode &&
        GetNodeTypeFromInteger(neighborNode.type) !== "stairs" &&
        currentNode &&
        GetNodeTypeFromInteger(currentNode.type) !== "stairs"
      );
    });
  }
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

export function findPathAStar(
  startId: string,
  endId: string,
  graph: GraphDto,
  settings: PathfindingSettings,
): string[] {
  const adjacency = buildAdjacencyMap(graph, settings);

  const openSet = new Set<string>([startId]);
  const cameFrom = new Map<string, string>();

  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();

  graph.nodes?.forEach((n) => {
    if (n.id) {
      gScore.set(n.id, Infinity);
      fScore.set(n.id, Infinity);
    }
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

    for (const neighborId of getNeighbors(current, adjacency, settings, graph)) {
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

export function findPathAStarMultiStart(
  startIds: string[],
  endIds: string[],
  graph: GraphDto,
  settings: PathfindingSettings,
): string[] {
  const adjacency = buildAdjacencyMap(graph, settings);

  const tryFindPath = (targetId: string): string[] => {
    const openSet = new Set<string>(startIds);
    const cameFrom = new Map<string, string>();

    const gScore = new Map<string, number>();
    const fScore = new Map<string, number>();

    graph.nodes?.forEach((n) => {
      if (n.id) {
        gScore.set(n.id, Infinity);
        fScore.set(n.id, Infinity);
      }
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

      for (const neighborId of getNeighbors(current, adjacency, settings, graph)) {
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

  let bestPath: string[] = [];
  let bestCost = Infinity;

  for (const targetId of endIds) {
    let doors = getDoorIdsForRoom(graph, targetId);
    if (doors.length === 0) doors = [targetId];

    for (const door of doors) {
      const path = tryFindPath(door);

      if (path.length > 0) {
        const cost = calculatePathCost(path, graph);

        if (cost < bestCost) {
          bestCost = cost;
          bestPath = path;
        }
      }
    }
  }

  return bestPath;
}

export function calculatePathCost(path: string[], graph: GraphDto): number {
  let totalCost = 0;

  for (let i = 0; i < path.length - 1; i++) {
    const fromNode = getNode(graph, path[i]);
    const toNode = getNode(graph, path[i + 1]);

    if (!fromNode || !toNode) {
      return Infinity;
    }

    totalCost += getEdgeCost(fromNode, toNode);
  }

  return totalCost;
}
