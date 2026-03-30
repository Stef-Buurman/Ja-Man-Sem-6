import { Graph } from "../Types/types";

export const graph: Graph = {
  nodes: [
    // ====================
    // First Floor (1)
    // ====================
    { id: 'stairway1', x: 320, y: 600, floor: 0, type: 'entrance', width: 48, height: 76 },

    // { id: 'hall_main', x: 400, y: 400, floor: 0, type: 'hallway', width: 500, height: 40 },

    // { id: 'hall_north', x: 400, y: 250, floor: 0, type: 'hallway', width: 40, height: 150 },
    // { id: 'hall_south', x: 400, y: 550, floor: 0, type: 'hallway', width: 40, height: 150 },

    { id: 'stairway2', x: 1025, y: 485, floor: 0, type: 'entrance', width: 68, height: 100 },
    { id: 'hall_WN_stairway2', x: 1025, y: 561, floor: 0, type: 'hallway', width: 40, height: 150 },

    { id: 'hall_WN_104', x: 762, y: 561, floor: 0, type: 'hallway', width: 40, height: 150 },
    { id: 'door_class104', x: 762, y: 582, floor: 0, type: 'door', width: 20, height: 1 },
    { id: 'class104', x: 668, y: 582, floor: 0, type: 'room', width: 95, height: 94 },

    { id: 'hall_WN_105', x: 790, y: 561, floor: 0, type: 'hallway', width: 40, height: 150 },
    { id: 'door_class105', x: 790, y: 586, floor: 0, type: 'door', width: 20, height: 1 },
    { id: 'class105', x: 764, y: 586, floor: 0, type: 'room', width: 96, height: 90 },

    { id: 'hall_WN_106', x: 900, y: 561, floor: 0, type: 'hallway', width: 40, height: 150 },
    { id: 'door_class106', x: 900, y: 586, floor: 0, type: 'door', width: 20, height: 1 },
    { id: 'class106', x: 860, y: 586, floor: 0, type: 'room', width: 120, height: 90 },

    { id: 'hall_WN_107', x: 1000, y: 561, floor: 0, type: 'hallway', width: 40, height: 150 },
    { id: 'door_class107', x: 1000, y: 586, floor: 0, type: 'door', width: 20, height: 1 },
    { id: 'class107', x: 980, y: 586, floor: 0, type: 'room', width: 115, height: 90 },

    { id: 'hall_WN_108', x: 1000, y: 561, floor: 0, type: 'hallway', width: 40, height: 150 },
    { id: 'door_class108', x: 1000, y: 586, floor: 0, type: 'door', width: 20, height: 1 },
    { id: 'class108', x: 368, y: 616, floor: 0, type: 'room', width: 75, height: 60 },
  ],

  edges: [
    // ====================
    // Ground Floor
    // ====================
    { from: 'stairway1', to: 'hall_main' },
    { from: 'stairway2', to: 'hall_WN_stairway2' },
    { from: 'hall_main', to: 'hall_north' },
    { from: 'hall_main', to: 'hall_south' },

    // North wing connections through doors
    { from: 'hall_north', to: 'door_class101' },
    { from: 'door_class101', to: 'class101' },
    { from: 'hall_north', to: 'door_class102' },
    { from: 'door_class102', to: 'class102' },
    { from: 'hall_north', to: 'door_class103' },
    { from: 'door_class103', to: 'class103' },
    { from: 'hall_north', to: 'door_gym' },
    { from: 'door_gym', to: 'gym' },

    // South wing connections through doors
    { from: 'hall_south', to: 'hall_WN_104' },
    { from: 'hall_WN_104', to: 'door_class104' },
    { from: 'door_class104', to: 'class104' },
    { from: 'hall_WN_104', to: 'hall_WN_105' },
    { from: 'hall_WN_105', to: 'door_class105' },
    { from: 'door_class105', to: 'class105' },
    { from: 'hall_WN_105', to: 'hall_WN_106' },
    { from: 'hall_WN_106', to: 'door_class106' },
    { from: 'door_class106', to: 'class106' },
    { from: 'hall_WN_106', to: 'hall_WN_107' },
    { from: 'hall_WN_107', to: 'door_class107' },
    { from: 'door_class107', to: 'class107' },
    { from: 'hall_WN_stairway2', to: 'hall_WN_107' },
  ],
};