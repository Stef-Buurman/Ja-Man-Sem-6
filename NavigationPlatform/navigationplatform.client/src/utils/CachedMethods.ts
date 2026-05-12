import { getFloors } from "../api/methods/Floor.api";
import { createCachedMethod } from "./MethodCache";

export const FloorCache = createCachedMethod(getFloors, 30);
