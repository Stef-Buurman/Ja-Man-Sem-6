import React, { useState } from "react";
import { Node, Edge } from "../../Types/types";

type Door = Omit<Node, "type"> & { type: "door" };

type GraphEditorProps = {
  background?: React.ReactNode;
  doors?: Door[];
  curFloor?: number;
};

export const GraphEditor: React.FC<GraphEditorProps> = ({ background, doors, curFloor }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const currentFloor = curFloor ?? 0;

  const snap = (value: number, grid = 10) => Math.round(value / grid) * grid;

  const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    const svgPoint = pt.matrixTransform(svg.getScreenCTM()?.inverse());

    const nodeWidth = 10;
    const nodeHeight = 10;

    const newNode: Node = {
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
    console.log("Node clicked: ", nodeId + " selectedNode: " + selectedNode);
    if (!selectedNode) {
      setSelectedNode(nodeId);
    } else {
      if (selectedNode !== nodeId) {
        if (edges.some((e) => (e.from === selectedNode && e.to === nodeId) || (e.from === nodeId && e.to === selectedNode))) {
          setEdges((prev) => prev.filter((e) => !(e.from === selectedNode && e.to === nodeId) && !(e.from === nodeId && e.to === selectedNode)));
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
    const formatNode = (n: any) => `{
    id: "${n.id}",
    x: ${Number(n.x.toFixed(2))},
    y: ${Number(n.y.toFixed(2))},
    floor: ${n.floor},
    type: "${n.type}",
    width: ${n.width ?? 10},
    height: ${n.height ?? 10}
  }`;

    const formatEdge = (e: any) => `{
    from: "${e.from}",
    to: "${e.to}"
  }`;

    const tsString = `
export const graph: Graph = {
  nodes: [
${nodes
  .concat(doors || [])
  .map(formatNode)
  .join(",\n")}
  ],
  edges: [
${edges.map(formatEdge).join(",\n")}
  ]
};`;

    navigator.clipboard.writeText(tsString);
    alert("Graph copied to clipboard!");
  };
  return (
    <div>
      <button onClick={exportGraph}>Copy Graph</button>
      <button onClick={() => setNodes([])}>Clear Graph</button>

      <svg viewBox="0 0 2412.61 1344.75" style={{ border: "1px solid #ccc", marginTop: 10 }} onClick={handleMapClick}>
        {background}
        {edges.map((e, i) => {
          const from = nodes.concat(doors || []).find((n) => n.id === e.from);
          const to = nodes.concat(doors || []).find((n) => n.id === e.to);
          if (!from || !to) return null;

          return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="black" strokeWidth={2} />;
        })}

        {doors?.map((d) => (
          <circle
            key={d.id}
            cx={d.x}
            cy={d.y}
            r={10}
            width={d.width}
            height={d.height}
            fill={selectedNode === d.id ? "red" : "yellow"}
            stroke="purple"
            strokeWidth={2}
            onClick={(e) => {
              e.stopPropagation();
              handleNodeClick(d.id);
            }}
          />
        ))}

        {nodes.map((n) => (
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
