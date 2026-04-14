import type { Graph } from "../../Types/types";

export const graph: Graph = {
  nodes: [
    // ====================
    // Ground Floor (0)
    // ====================
    {
      id: "entrance",
      x: 100,
      y: 400,
      floor: 0,
      type: "entrance",
      width: 60,
      height: 60,
    },

    // Main horizontal corridor
    {
      id: "hall_main",
      x: 400,
      y: 400,
      floor: 0,
      type: "hallway",
      width: 500,
      height: 40,
    },

    // Vertical corridors (north & south wings)
    {
      id: "hall_north",
      x: 400,
      y: 250,
      floor: 0,
      type: "hallway",
      width: 40,
      height: 150,
    },
    {
      id: "hall_south",
      x: 400,
      y: 550,
      floor: 0,
      type: "hallway",
      width: 40,
      height: 150,
    },

    // North wing classrooms
    {
      id: "class101",
      x: 300,
      y: 150,
      floor: 0,
      type: "room",
      width: 80,
      height: 80,
    },
    {
      id: "class102",
      x: 400,
      y: 130,
      floor: 0,
      type: "room",
      width: 80,
      height: 80,
    },
    {
      id: "class103",
      x: 500,
      y: 150,
      floor: 0,
      type: "room",
      width: 80,
      height: 80,
    },

    // South wing classrooms
    {
      id: "class104",
      x: 300,
      y: 650,
      floor: 0,
      type: "room",
      width: 80,
      height: 80,
    },
    {
      id: "class105",
      x: 400,
      y: 650,
      floor: 0,
      type: "room",
      width: 80,
      height: 80,
    },
    {
      id: "class106",
      x: 500,
      y: 650,
      floor: 0,
      type: "room",
      width: 80,
      height: 80,
    },

    // Gym and cafeteria
    {
      id: "gym",
      x: 650,
      y: 150,
      floor: 0,
      type: "room",
      width: 120,
      height: 120,
    },
    {
      id: "cafeteria",
      x: 650,
      y: 650,
      floor: 0,
      type: "room",
      width: 120,
      height: 120,
    },

    // Stairs/escalator
    {
      id: "stairs0",
      x: 900,
      y: 400,
      floor: 0,
      type: "stairs",
      width: 50,
      height: 50,
    },

    // ====================
    // Doors for Ground Floor Rooms
    // ====================
    {
      id: "door_class101",
      x: 360,
      y: 210,
      floor: 0,
      type: "door",
      width: 20,
      height: 20,
    },
    {
      id: "door_class102",
      x: 400,
      y: 190,
      floor: 0,
      type: "door",
      width: 20,
      height: 20,
    },
    {
      id: "door_class103",
      x: 500,
      y: 210,
      floor: 0,
      type: "door",
      width: 20,
      height: 20,
    },
    {
      id: "door_gym",
      x: 650,
      y: 230,
      floor: 0,
      type: "door",
      width: 20,
      height: 20,
    },

    {
      id: "door_class104",
      x: 300,
      y: 650,
      floor: 0,
      type: "door",
      width: 20,
      height: 20,
    },
    {
      id: "door_class105",
      x: 400,
      y: 650,
      floor: 0,
      type: "door",
      width: 20,
      height: 20,
    },
    {
      id: "door_class106",
      x: 500,
      y: 650,
      floor: 0,
      type: "door",
      width: 20,
      height: 20,
    },
    {
      id: "door_cafeteria",
      x: 650,
      y: 650,
      floor: 0,
      type: "door",
      width: 20,
      height: 20,
    },

    // ====================
    // First Floor (1)
    // ====================
    {
      id: "stairs1",
      x: 100,
      y: 250,
      floor: 1,
      type: "stairs",
      width: 50,
      height: 50,
    }, // top-left

    // Main horizontal corridor
    {
      id: "hall_main1",
      x: 400,
      y: 300,
      floor: 1,
      type: "hallway",
      width: 500,
      height: 40,
    },

    // Vertical corridors (north & south wings)
    {
      id: "hall_north1",
      x: 400,
      y: 200,
      floor: 1,
      type: "hallway",
      width: 40,
      height: 150,
    },
    {
      id: "hall_south1",
      x: 400,
      y: 450,
      floor: 1,
      type: "hallway",
      width: 40,
      height: 150,
    },

    // North wing classrooms
    {
      id: "class201",
      x: 300,
      y: 120,
      floor: 1,
      type: "room",
      width: 80,
      height: 80,
    },
    {
      id: "class202",
      x: 400,
      y: 80,
      floor: 1,
      type: "room",
      width: 80,
      height: 80,
    },
    {
      id: "class203",
      x: 500,
      y: 120,
      floor: 1,
      type: "room",
      width: 80,
      height: 80,
    },

    // South wing labs
    {
      id: "lab204",
      x: 240,
      y: 400,
      floor: 1,
      type: "room",
      width: 80,
      height: 80,
    },
    {
      id: "lab205",
      x: 400,
      y: 500,
      floor: 1,
      type: "room",
      width: 80,
      height: 80,
    },
    {
      id: "lab206",
      x: 500,
      y: 400,
      floor: 1,
      type: "room",
      width: 80,
      height: 80,
    },

    // Doors for First Floor Rooms
    {
      id: "door_class201",
      x: 300,
      y: 180,
      floor: 1,
      type: "door",
      width: 20,
      height: 20,
    },
    {
      id: "door_class202",
      x: 400,
      y: 140,
      floor: 1,
      type: "door",
      width: 20,
      height: 20,
    },
    {
      id: "door_class203",
      x: 500,
      y: 180,
      floor: 1,
      type: "door",
      width: 20,
      height: 20,
    },

    {
      id: "door_lab204",
      x: 300,
      y: 400,
      floor: 1,
      type: "door",
      width: 20,
      height: 20,
    },
    {
      id: "door_lab205",
      x: 400,
      y: 500,
      floor: 1,
      type: "door",
      width: 20,
      height: 20,
    },
    {
      id: "door_lab206",
      x: 500,
      y: 400,
      floor: 1,
      type: "door",
      width: 20,
      height: 20,
    },
  ],

  edges: [
    // ====================
    // Ground Floor
    // ====================
    { from: "entrance", to: "hall_main" },
    { from: "hall_main", to: "hall_north" },
    { from: "hall_main", to: "hall_south" },
    { from: "hall_main", to: "stairs0" },

    // North wing connections through doors
    { from: "hall_north", to: "door_class101" },
    { from: "door_class101", to: "class101" },
    { from: "hall_north", to: "door_class102" },
    { from: "door_class102", to: "class102" },
    { from: "hall_north", to: "door_class103" },
    { from: "door_class103", to: "class103" },
    { from: "hall_north", to: "door_gym" },
    { from: "door_gym", to: "gym" },

    // South wing connections through doors
    { from: "hall_south", to: "door_class104" },
    { from: "door_class104", to: "class104" },
    { from: "hall_south", to: "door_class105" },
    { from: "door_class105", to: "class105" },
    { from: "hall_south", to: "door_class106" },
    { from: "door_class106", to: "class106" },
    { from: "hall_south", to: "door_cafeteria" },
    { from: "door_cafeteria", to: "cafeteria" },

    { from: "stairs1", to: "stairs0" },
    { from: "stairs0", to: "stairs1" },
    // ====================
    // First Floor
    // ====================
    { from: "stairs1", to: "hall_main1" },
    { from: "hall_main1", to: "hall_north1" },
    { from: "hall_main1", to: "hall_south1" },

    // North wing connections through doors
    { from: "hall_north1", to: "door_class201" },
    { from: "door_class201", to: "class201" },
    { from: "hall_north1", to: "door_class202" },
    { from: "door_class202", to: "class202" },
    { from: "hall_north1", to: "door_class203" },
    { from: "door_class203", to: "class203" },

    // South wing connections through doors
    { from: "hall_south1", to: "door_lab204" },
    { from: "door_lab204", to: "lab204" },
    { from: "hall_south1", to: "door_lab205" },
    { from: "door_lab205", to: "lab205" },
    { from: "hall_south1", to: "door_lab206" },
    { from: "door_lab206", to: "lab206" },
  ],
};
