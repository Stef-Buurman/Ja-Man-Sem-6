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

import type { DeleteHeatpointAreaParams, HeatPoint, HeatpointArea, UpdateHeatpointAreaParams } from "./data-contracts";
import { ContentType, HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class Heatmap<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Heatmap
   * @name AddPoint
   * @request POST:/api/Heatmap
   */
  addPoint = (data: HeatPoint, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Heatmap`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Heatmap
   * @name GetHeatmap
   * @request GET:/api/Heatmap
   */
  getHeatmap = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Heatmap`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Heatmap
   * @name GetHeatpointAreas
   * @request GET:/api/Heatmap/areas
   */
  getHeatpointAreas = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Heatmap/areas`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Heatmap
   * @name AddHeatpointArea
   * @request POST:/api/Heatmap/areas
   */
  addHeatpointArea = (data: HeatpointArea, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Heatmap/areas`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Heatmap
   * @name UpdateRangeHeatpointArea
   * @request PUT:/api/Heatmap/areas
   */
  updateRangeHeatpointArea = (data: HeatpointArea[], params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Heatmap/areas`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Heatmap
   * @name UpdateHeatpointArea
   * @request PUT:/api/Heatmap/areas/{id}
   */
  updateHeatpointArea = ({ id }: UpdateHeatpointAreaParams, data: HeatpointArea, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Heatmap/areas/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Heatmap
   * @name DeleteHeatpointArea
   * @request DELETE:/api/Heatmap/areas/{id}
   */
  deleteHeatpointArea = ({ id }: DeleteHeatpointAreaParams, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Heatmap/areas/${id}`,
      method: "DELETE",
      ...params,
    });
}
