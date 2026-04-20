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

export interface ApiResponse {
  success: boolean;
  data?: any;
  message: string | null;
}

export interface EncryptDecryptRequest {
  data: string | null;
  key: string | null;
}

export interface GetJwtResponse {
  token: string | null;
}

export interface HashRequest {
  data: string | null;
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

export interface GetKeyOptionsParams {
  /** @format int32 */
  Amount?: number;
}

export interface UpdateHeatpointAreaParams {
  /** @format int32 */
  id: number;
}

export interface DeleteHeatpointAreaParams {
  /** @format int32 */
  id: number;
}
