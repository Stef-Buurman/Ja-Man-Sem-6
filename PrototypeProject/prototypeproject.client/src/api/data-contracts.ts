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

export interface WeatherForecast {
  /** @format date */
  date: string;
  /** @format int32 */
  temperatureC: number;
  /** @format int32 */
  temperatureF: number;
  summary?: string | null;
}

export interface HashDataParams {
  data?: string;
}

export interface GetKeyOptionsParams {
  /**
   * @format int32
   * @default 5
   */
  amount?: number;
}
