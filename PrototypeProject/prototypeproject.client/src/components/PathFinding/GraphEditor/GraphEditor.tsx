import React, { useEffect, useState } from "react";
import type { Graph, Edge, GraphNode, Floor } from "../../../Types/types";
import { distinctBy } from "../../../utils/DistinctBy";
import { IsNodeElevator, IsNodeStairs } from "../../../utils/IsNode";

type Door = Omit<GraphNode, "type"> & { type: "door" };
type Stairs = Omit<GraphNode, "type"> & { type: "stairs" };
type Elevator = Omit<GraphNode, "type"> & { type: "elevator" };

type GraphEditorProps = {
  floors?: Floor[];
  doors?: (Door | Stairs | Elevator)[];
  curFloor?: number;
  initialGraph?: Graph;
};

export const GraphEditor: React.FC<GraphEditorProps> = ({ floors, doors, curFloor, initialGraph }) => {
  const [nodes, setNodes] = useState<GraphNode[]>(initialGraph?.nodes ?? []);
  const [edges, setEdges] = useState<Edge[]>(initialGraph?.edges ?? []);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const currentFloor = curFloor ?? 0;

  const snap = (value: number, grid = 10) => Math.round(value / grid) * grid;

  useEffect(() => {
    if (initialGraph) {
      setNodes(initialGraph.nodes);
      setEdges(initialGraph.edges);
    }
  }, [initialGraph]);

  const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    const svgPoint = pt.matrixTransform(svg.getScreenCTM()?.inverse());

    const nodeWidth = 10;
    const nodeHeight = 10;

    const newNode: GraphNode = {
      id: `node_${Date.now()}`,
      x: snap(svgPoint.x - nodeWidth / 4, nodeWidth / 4),
      y: snap(svgPoint.y - nodeHeight / 4, nodeHeight / 4),
      floor: currentFloor,
      type: "hallway",
      width: nodeWidth,
      height: nodeHeight,
    };

    setNodes((prev) => [...prev, newNode]);
  };

  const handleNodeClick = (nodeId: string) => {
    if (!selectedNode) {
      setSelectedNode(nodeId);
    } else {
      if (selectedNode !== nodeId) {
        const alreadyExists = edges.some((e) => (e.from === selectedNode && e.to === nodeId) || (e.from === nodeId && e.to === selectedNode));

        if (alreadyExists) {
          setEdges((prev) => prev.filter((e) => !((e.from === selectedNode && e.to === nodeId) || (e.from === nodeId && e.to === selectedNode))));
        } else {
          setEdges((prev) => [...prev, { from: selectedNode, to: nodeId }]);
        }
      }

      setSelectedNode(null);
    }
  };

  const handleDeleteNode = (nodeId: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    setEdges((prev) => prev.filter((e) => e.from !== nodeId && e.to !== nodeId));
  };

  const exportGraph = () => {
    setEdges((prev) =>
      prev.filter((e) => {
        const from = nodes.find((n) => n.id === e.from);
        const to = nodes.find((n) => n.id === e.to);
        return from && to;
      }),
    );
    const formatNode = (n: GraphNode) => `    {
      id: "${n.id}",
      x: ${Number(n.x.toFixed(2))},
      y: ${Number(n.y.toFixed(2))},
      floor: ${n.floor},
      type: "${n.type}",
      width: ${n.width ?? 10},
      height: ${n.height ?? 10}
      ${n.roomId ? `,      roomId: "${n.roomId}"` : ""}
      ${n.label ? `,      label: "${n.label}"` : ""}
    }`;

    const formatEdge = (e: Edge) => `    {
      from: "${e.from}",
      to: "${e.to}"
    }`;

    var x: GraphNode[] = visibleDoors
      .filter(d => IsNodeStairs(d) || IsNodeElevator(d))
      .map(d => {
        if (IsNodeStairs(d)) {
          return {
            id: d.roomId || d.id.replace("_door", ""),
            x: d.x,
            y: d.y,
            floor: d.floor,
            type: "stairs",
            width: d.width,
            height: d.height
          };
        } else {
          return {
            id: d.roomId || d.id.replace("_door", ""),
            x: d.x,
            y: d.y,
            floor: d.floor,
            type: "elevator",
            width: d.width,
            height: d.height
          };
        }
      });

    var y: Edge[] = x.map(element => {
      return {
        from: element.id,
        to: element.id + "_door"
      };
    });

    const tsString = `import { Graph } from "../Types/types";

export const exportedGraph: Graph = {
  nodes: [
${distinctBy(nodes.concat(visibleDoors).concat(x), (n) => n.id)
        .map(formatNode)
        .join(",\n")}
  ],
  edges: [
${distinctBy(edges.concat(y), (e) => [e.from, e.to].sort().join("-"))
        .map(formatEdge)
        .join(",\n")}
  ]
};`;

    navigator.clipboard.writeText(tsString);
    alert("Graph copied to clipboard!");
  };

  const visibleNodes = nodes.filter((n) => n.floor === currentFloor && n.type !== "door" && n.type !== "stairs" && n.type !== "elevator");
  const visibleDoors = (doors ? doors : (initialGraph?.nodes.filter((n) => n.type === "door" || n.type === "stairs" || n.type === "elevator") ?? [])).filter((d) => d.floor === currentFloor);

  const allVisibleNodes = [...visibleNodes, ...visibleDoors];
  const FloorSvg = floors?.find((f) => f.floorNumber === curFloor)?.svg;

  return (
    <div>
      <button onClick={exportGraph}>Copy Graph</button>
      <button
        onClick={() => {
          setNodes([]);
          setEdges([]);
        }}
      >
        Clear Graph
      </button>

      <svg viewBox="0 0 2412.61 1344.75" style={{ border: "1px solid #ccc", marginTop: 10 }} onClick={handleMapClick}>
        {FloorSvg && <FloorSvg />}

        {edges.map((e, i) => {
          const from = allVisibleNodes.find((n) => n.id === e.from);
          const to = allVisibleNodes.find((n) => n.id === e.to);

          if (!from || !to) return null;

          return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="black" strokeWidth={2} />;
        })}

        {visibleDoors.map((d) => (
          <circle
            key={d.id}
            cx={d.x}
            cy={d.y}
            r={10}
            fill={selectedNode === d.id ? "red" : "yellow"}
            stroke="purple"
            strokeWidth={2}
            onClick={(e) => {
              e.stopPropagation();
              handleNodeClick(d.id);
            }}
          />
        ))}

        {visibleNodes.map((n) => (
          <circle
            key={n.id}
            cx={n.x}
            cy={n.y}
            r={6}
            fill={selectedNode === n.id ? "red" : "blue"}
            onClick={(e) => {
              e.stopPropagation();
              handleNodeClick(n.id);
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              handleDeleteNode(n.id);
            }}
          />
        ))}
      </svg>
    </div>
  );
};
