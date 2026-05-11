/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** @format int32 */
export enum NodeType {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value4 = 4,
  Value5 = 5,
  Value6 = 6,
}

export interface GraphDto {
  nodes: GraphNodeDto[] | null;
  edges: GraphEdgeDto[] | null;
}

export interface GraphEdgeDto {
  from: string | null;
  to: string | null;
  /** @format double */
  weight?: number | null;
}

export interface GraphNodeDto {
  id: string | null;
  /** @format double */
  x: number;
  /** @format double */
  y: number;
  /** @format int32 */
  floor: number;
  type: NodeType;
  /** @format double */
  width?: number | null;
  /** @format double */
  height?: number | null;
  roomId?: string | null;
  label?: string | null;
}

export interface HeatpointArea {
  /** @format int32 */
  id: number;
  /** @format double */
  x: number;
  /** @format double */
  y: number;
  /** @format int32 */
  value: number;
  /** @format int32 */
  soundLevel: number;
  /** @format int32 */
  level: number;
  /** @format int32 */
  floor: number;
  /** @format int32 */
  width: number;
  /** @format int32 */
  height: number;
  color: string | null;
}

export interface GetGraphParams {
  /** @format int32 */
  Floor?: number;
}

export interface UpdateHeatpointAreaParams {
  /** @format int32 */
  id: number;
}

export interface DeleteHeatpointAreaParams {
  /** @format int32 */
  id: number;
}
