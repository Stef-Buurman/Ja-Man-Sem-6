import React, { useEffect, useState } from "react";
import { distinctBy } from "../../utils/DistinctBy";
import { IsNodeElevator, IsNodeStairs } from "../../utils/IsNode";
import type { GraphEditorProps } from "./GraphEditor.props";
import { NodeType, type GraphDto, type GraphEdgeDto, type GraphNodeDto } from "../../api/data-contracts";
import { GetNodeTypeFromInteger, GetTypeFromNodeType } from "../../utils/NodeTypeFromType";
import { updateGraph } from "../../api/methods/Graph.api";

export const GraphEditor: React.FC<GraphEditorProps> = ({ floors, doors, curFloor, initialGraph }) => {
  const [nodes, setNodes] = useState<GraphNodeDto[]>(initialGraph?.nodes ?? []);
  const [edges, setEdges] = useState<GraphEdgeDto[]>(initialGraph?.edges ?? []);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [viewBox, setViewBox] = useState<string | null>(null);
  const [newNodeType, setNewNodeType] = useState<NodeType>(GetTypeFromNodeType("hallway"));

  const currentFloor = curFloor ?? 0;

  const snap = (value: number, grid = 10) => Math.round(value / grid) * grid;

  useEffect(() => {
    if (initialGraph) {
      setNodes(initialGraph.nodes ?? []);
      setEdges(initialGraph.edges ?? []);
    }
  }, [initialGraph]);

  const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    const svgPoint = pt.matrixTransform(svg.getScreenCTM()?.inverse());

    let nodeWidth = 10;
    let nodeHeight = 10;
    let id = `node_${Date.now()}`;

    if (newNodeType === GetTypeFromNodeType("entrance")) {
      nodeWidth = 30;
      nodeHeight = 30;

      const usedNumbers = new Set<number>();

      for (const node of nodes) {
        const id = node.id;

        if (id?.startsWith("Ingang_")) {
          const numberPart = id.slice("Ingang_".length);
          const number = Number(numberPart);

          if (Number.isInteger(number) && number > 0) {
            usedNumbers.add(number);
          }
        }
      }

      let nextNumber = 1;
      while (usedNumbers.has(nextNumber)) {
        nextNumber++;
      }

      id = `Ingang_${nextNumber}`;
    }

    const newNode: GraphNodeDto = {
      id: id,
      x: snap(svgPoint.x - nodeWidth / 4, nodeWidth / 4),
      y: snap(svgPoint.y - nodeHeight / 4, nodeHeight / 4),
      floor: currentFloor,
      type: newNodeType,
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
        const alreadyExists = edges.some(
          (e) => (e.from === selectedNode && e.to === nodeId) || (e.from === nodeId && e.to === selectedNode),
        );

        if (alreadyExists) {
          setEdges((prev) =>
            prev.filter(
              (e) => !((e.from === selectedNode && e.to === nodeId) || (e.from === nodeId && e.to === selectedNode)),
            ),
          );
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

  const save = () => {
    var floorId = floors?.find((f) => f.number === currentFloor)?.id;
    if (!floorId) {
      alert("Floor not found!");
      return;
    }
    updateGraph({ id: floorId }, buildExportGraph(), {
      toastError: {
        message: "Failed to save graph",
      },
      toastSuccess: {
        message: "Graph saved successfully",
      },
    });
  };

  const exportGraph = () => {
    setEdges((prev) =>
      prev.filter((e) => {
        const from = nodes.find((n) => n.id === e.from);
        const to = nodes.find((n) => n.id === e.to);
        return from && to;
      }),
    );
    const formatNode = (n: GraphNodeDto) => `    {
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

    const formatEdge = (e: GraphEdgeDto) => `    {
      from: "${e.from}",
      to: "${e.to}"
    }`;

    var x: GraphNodeDto[] = visibleDoors
      .filter((d) => IsNodeStairs(d) || IsNodeElevator(d))
      .map((d) => {
        if (IsNodeStairs(d)) {
          return {
            id: d.roomId || (d.id != null ? d.id.replace("_door", "") : ""),
            x: d.x,
            y: d.y,
            floor: d.floor,
            type: GetTypeFromNodeType("stairs"),
            width: d.width,
            height: d.height,
          };
        } else {
          return {
            id: d.roomId || (d.id != null ? d.id.replace("_door", "") : ""),
            x: d.x,
            y: d.y,
            floor: d.floor,
            type: GetTypeFromNodeType("elevator"),
            width: d.width,
            height: d.height,
          };
        }
      });

    var y: GraphEdgeDto[] = x.map((element) => {
      return {
        from: element.id,
        to: element.id + "_door",
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

  const visibleNodes = nodes.filter(
    (n) =>
      n.floor === currentFloor &&
      GetNodeTypeFromInteger(n.type) !== "door" &&
      GetNodeTypeFromInteger(n.type) !== "stairs" &&
      GetNodeTypeFromInteger(n.type) !== "elevator",
  );
  const visibleDoors = (
    doors
      ? doors
      : (initialGraph?.nodes?.filter(
        (n) =>
          GetNodeTypeFromInteger(n.type) === "door" ||
          GetNodeTypeFromInteger(n.type) === "stairs" ||
          GetNodeTypeFromInteger(n.type) === "elevator",
      ) ?? [])
  ).filter((d) => d.floor === currentFloor);

  const allVisibleNodes = [...visibleNodes, ...visibleDoors];
  const selectedFloor = floors?.find((f) => f.number === currentFloor);

  const [floorSvgContent, setFloorSvgContent] = useState<string>("");

  useEffect(() => {
    if (!selectedFloor?.fileName) return;

    const loadSvg = async () => {
      const response = await fetch(`/floors/${selectedFloor.fileName}`);
      const svgText = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(svgText, "image/svg+xml");
      const svg = doc.querySelector("svg");

      if (!svg) return;

      const vb = svg.getAttribute("viewBox");
      if (vb) setViewBox(vb);

      setFloorSvgContent(svg.innerHTML);
    };

    loadSvg();
  }, [selectedFloor?.fileName]);

  const buildExportGraph = (): GraphDto => {
    const validEdges = edges.filter((e) => {
      const from = nodes.find((n) => n.id === e.from) || visibleDoors.find((d) => d.id === e.from);
      const to = nodes.find((n) => n.id === e.to) || visibleDoors.find((d) => d.id === e.to);
      return from && to;
    });
    console.log(doors)
    var x: GraphNodeDto[] = visibleDoors
      .filter((d) => IsNodeStairs(d) || IsNodeElevator(d))
      .map((d) => {
        if (IsNodeStairs(d)) {
          return {
            id: d.roomId || (d.id != null ? d.id.replace("_door", "") : ""),
            x: d.x,
            y: d.y,
            floor: d.floor,
            type: GetTypeFromNodeType("stairs"),
            width: d.width,
            height: d.height,
          };
        } else {
          return {
            id: d.roomId || (d.id != null ? d.id.replace("_door", "") : ""),
            x: d.x,
            y: d.y,
            floor: d.floor,
            type: GetTypeFromNodeType("elevator"),
            width: d.width,
            height: d.height,
          };
        }
      });
    console.log(nodes);
    console.log(visibleDoors);
    console.log(x);

    const generatedEdges: GraphEdgeDto[] = x.map((element) => ({
      from: element.id,
      to: `${element.id}_door`,
    }));
    console.log(distinctBy(nodes.concat(visibleDoors).concat(x), (n) => n.id))
    return {
      nodes: distinctBy(nodes.concat(visibleDoors).concat(x), (n) => n.id),
      edges: distinctBy(validEdges.concat(generatedEdges), (e) => [e.from, e.to].sort().join("-")),
    };
  };

  const exportGraphJson = () => {
    const graph = buildExportGraph();
    console.log("Exporting graph:", graph);
    const jsonString = JSON.stringify(graph, null, 2);
    navigator.clipboard.writeText(jsonString);
    alert("Graph JSON copied to clipboard!");
  };

  return (
    <div>
      <select value={newNodeType} onChange={(e) => setNewNodeType(Number(e.target.value) as NodeType)}>
        <option value={GetTypeFromNodeType("hallway")}>Hallway</option>
        <option value={GetTypeFromNodeType("entrance")}>Entrance</option>
      </select>
      <button onClick={exportGraph}>Copy Graph</button>
      <button onClick={exportGraphJson}>Copy Graph JSON</button>
      <button
        onClick={() => {
          setNodes([]);
          setEdges([]);
        }}
      >
        Clear Graph
      </button>
      <button onClick={save}>Save Graph</button>

      <svg
        viewBox={viewBox || "0 0 2412.61 1344.75"}
        style={{ border: "1px solid #ccc", marginTop: 10 }}
        onClick={handleMapClick}
      >
        {floorSvgContent && <g dangerouslySetInnerHTML={{ __html: floorSvgContent }} />}

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
              handleNodeClick(d.id ?? "");
            }}
          />
        ))}

        {visibleNodes
          .filter((n) => n.type === GetTypeFromNodeType("hallway"))
          .map((n) => (
            <circle
              name={n.id ?? ""}
              key={n.id}
              cx={n.x}
              cy={n.y}
              r={6}
              fill={selectedNode === n.id ? "red" : "blue"}
              onClick={(e) => {
                e.stopPropagation();
                handleNodeClick(n.id ?? "");
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                handleDeleteNode(n.id ?? "");
              }}
            />
          ))}

        {visibleNodes
          .filter((n) => n.type === GetTypeFromNodeType("entrance"))
          .map((n) => (
            <rect
              key={n.id}
              x={n.x - (n.width || 50) / 2}
              y={n.y - (n.height || 50) / 2}
              width={n.width || 50}
              height={n.height || 50}
              fill={selectedNode === n.id ? "red" : "green"}
              onClick={(e) => {
                e.stopPropagation();
                handleNodeClick(n.id ?? "");
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                handleDeleteNode(n.id ?? "");
              }}
            />
          ))}
      </svg>
    </div>
  );
};
