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
  let cost = Math.hypot(to.x - from.x, to.y - from.y);

  const floorDifference = Math.abs(from.floor - to.floor);
  cost += floorDifference * 2000;

  if (GetNodeTypeFromInteger(to.type) === "stairs") {
    cost += 50;
  }

  if (GetNodeTypeFromInteger(to.type) === "elevator") {
    cost += 20;
  }

  if (GetNodeTypeFromInteger(to.type) === "door") {
    cost += 5;
  }

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
        console.log(`Path found to target ${reconstructPath(cameFrom, current)}`);
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
  let bestDistance = Infinity;

  for (const targetId of endIds) {
    let doors = getDoorIdsForRoom(graph, targetId);
    console.log(`Doors for room ${targetId}:`, doors);
    if (doors.length === 0) doors = [targetId];
    for (const door of doors) {
      const path = tryFindPath(door);
      console.log(`Path to ${door}:`, path);

      if (path.length > 0) {
        const distance = calculateWalkingDistance(path, graph);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestPath = path;
        }
      }
    }
  }

  return bestPath;
}

export function calculateWalkingDistance(path: string[], graph: GraphDto): number {
  let totalDistance = 0;

  for (let i = 0; i < path.length - 1; i++) {
    const fromNode = getNode(graph, path[i]);
    const toNode = getNode(graph, path[i + 1]);

    if (!fromNode || !toNode) {
      return Infinity;
    }

    totalDistance += getEdgeCost(fromNode, toNode);
  }

  return totalDistance;
}

export type PathStep = {
  floor: number;
  title: string;
  instruction: string;
  nodeIds: string[];
};

const buildingInfo: Record<string, { color: string; name: string }> = {
  WD: {
    color: "donkerblauwe",
    name: "WD-gebouw",
  },
  WN: {
    color: "gele",
    name: "WN-gebouw",
  },
  H: {
    color: "roze",
    name: "H-gebouw",
  },
};

function getBuildingInstruction(node?: GraphNodeDto): string {
  const buildingCode = getBuildingCode(node);

  if (!buildingCode) return "";

  const info = buildingInfo[buildingCode];

  if (!info) {
    return `Ga richting het ${buildingCode}-gebouw.`;
  }

  return `Ga richting het ${info.color} ${info.name}.`;
}

const buildingColors: Record<string, string> = {
  WD: "donkerblauwe",
  WN: "gele",
  H: "roze",
};

function getNodeDisplayName(node?: GraphNodeDto): string {
  if (!node) return "";

  const type = GetNodeTypeFromInteger(node.type);
  const rawName = node.label || node.roomId || "";

  if (rawName.toLowerCase().startsWith("node_")) return "";

  if (type === "entrance") return "de ingang";
  if (type === "elevator") return "de lift";
  if (type === "stairs") return "de trap";
  if (type === "door") return rawName ? `de deur bij ${rawName}` : "de deur";

  return rawName;
}

function getBuildingCode(node?: GraphNodeDto): string | undefined {
  const value = node?.roomId || node?.label || node?.id || "";
  const match = value.match(/^(WD|WN|H)(?=[._-]|\d|$)/i);

  return match ? match[1].toUpperCase() : undefined;
}

function getBuildingText(node?: GraphNodeDto): string {
  const buildingCode = getBuildingCode(node);

  if (!buildingCode) return "het gebouw";

  const color = buildingColors[buildingCode];

  return color ? `het ${color} ${buildingCode}-gebouw` : `het ${buildingCode}-gebouw`;
}

function getConnectorName(fromNode: GraphNodeDto, toNode: GraphNodeDto): string {
  const fromType = GetNodeTypeFromInteger(fromNode.type);
  const toType = GetNodeTypeFromInteger(toNode.type);

  return fromType === "elevator" || toType === "elevator" ? "lift" : "trap";
}

function isConnectorNode(node: GraphNodeDto): boolean {
  const type = GetNodeTypeFromInteger(node.type);
  return type === "stairs" || type === "elevator";
}

function getSimpleDirectionInstruction(fromNode: GraphNodeDto, toNode: GraphNodeDto): string {
  const dx = (toNode.x ?? 0) - (fromNode.x ?? 0);

  if (dx > 80) return "naar links";
  if (dx < -80) return "naar rechts";

  return "rechtdoor";
}

function getExitDirectionInstruction(connectorNode: GraphNodeDto, nextNode: GraphNodeDto): string {
  const dx = (nextNode.x ?? 0) - (connectorNode.x ?? 0);

  if (dx > 20) return "naar links";
  if (dx < -20) return "naar rechts";

  return "rechtdoor";
}

function getTargetText(targetNode: GraphNodeDto): string {
  const nodeName = getNodeDisplayName(targetNode);

  if (nodeName) {
    return `richting ${nodeName}`;
  }

  return `door ${getBuildingText(targetNode)}`;
}

function getWalkingInstruction(fromNode: GraphNodeDto, targetNode: GraphNodeDto): string {
  const direction = getSimpleDirectionInstruction(fromNode, targetNode);

  const targetText = getTargetText(targetNode);

  const buildingInstruction = getBuildingInstruction(targetNode);

  return `Loop ${direction} ${targetText}. ${buildingInstruction}`.trim();
}

function getTransitionInstruction(fromNode: GraphNodeDto, toNode: GraphNodeDto): string {
  return `Neem de ${getConnectorName(fromNode, toNode)} naar verdieping ${toNode.floor}.`;
}

type FloorSegment = {
  floor: number;
  nodes: GraphNodeDto[];
};

function splitPathIntoFloorSegments(nodes: GraphNodeDto[]): FloorSegment[] {
  const segments: FloorSegment[] = [];

  for (const node of nodes) {
    const lastSegment = segments[segments.length - 1];

    if (!lastSegment || lastSegment.floor !== node.floor) {
      segments.push({
        floor: node.floor,
        nodes: [node],
      });
    } else {
      lastSegment.nodes.push(node);
    }
  }

  return segments;
}

function isMeaningfulSegment(segment: FloorSegment, index: number, segments: FloorSegment[]): boolean {
  if (index === 0 || index === segments.length - 1) return true;

  return segment.nodes.some((node) => !isConnectorNode(node));
}

export function buildPathSteps(path: string[], graph: GraphDto): PathStep[] {
  if (!path.length || !graph.nodes?.length) return [];

  const nodesInPath = path
    .map((id) => getNode(graph, id))
    .filter((node): node is GraphNodeDto => Boolean(node));

  if (nodesInPath.length === 0) return [];

  const allSegments = splitPathIntoFloorSegments(nodesInPath);
  const segments = allSegments.filter(isMeaningfulSegment);

  return segments.map((segment, index): PathStep => {
    const firstNode = segment.nodes[0];
    const lastNode = segment.nodes[segment.nodes.length - 1];

    const previousSegment = segments[index - 1];
    const nextSegment = segments[index + 1];

    const nodeIds = segment.nodes
      .map((node) => node.id)
      .filter((id): id is string => Boolean(id));

    let instruction = "";

    if (index === 0) {
      instruction = getWalkingInstruction(firstNode, lastNode);

      if (nextSegment) {
        instruction += ` ${getTransitionInstruction(lastNode, nextSegment.nodes[0])}`;
      }
    } else {
      const previousLastNode = previousSegment.nodes[previousSegment.nodes.length - 1];
      const connector = getConnectorName(previousLastNode, firstNode);
      const exitDirection = getExitDirectionInstruction(firstNode, lastNode);

      instruction = `Verlaat de ${connector} en ga ${exitDirection}.`;

      if (firstNode.id !== lastNode.id) {
        instruction += ` ${getWalkingInstruction(firstNode, lastNode)}`;
      }

      if (nextSegment) {
        instruction += ` ${getTransitionInstruction(lastNode, nextSegment.nodes[0])}`;
      } else {
        instruction += " Bestemming bereikt.";
      }
    }

    return {
      floor: segment.floor,
      title: `Verdieping ${segment.floor}`,
      instruction,
      nodeIds,
    };
  });
}