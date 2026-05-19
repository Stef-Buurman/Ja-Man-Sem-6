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

import type {
  DeleteHeatpointAreaParams,
  HeatpointArea,
  HeatpointAreaDto,
  UpdateHeatpointAreaParams,
} from "./data-contracts";
import { ContentType, HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class Heatmap<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Heatmap
   * @name GetHeatpointAreas
   * @request GET:/api/Heatmap
   */
  getHeatpointAreas = (params: RequestParams = {}) =>
    this.request<HeatpointArea[], any>({
      path: `/api/Heatmap`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Heatmap
   * @name AddHeatpointArea
   * @request POST:/api/Heatmap
   */
  addHeatpointArea = (data: HeatpointAreaDto, params: RequestParams = {}) =>
    this.request<HeatpointArea, any>({
      path: `/api/Heatmap`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Heatmap
   * @name UpdateRangeHeatpointArea
   * @request PUT:/api/Heatmap
   */
  updateRangeHeatpointArea = (data: HeatpointAreaDto[], params: RequestParams = {}) =>
    this.request<HeatpointArea[], any>({
      path: `/api/Heatmap`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Heatmap
   * @name GetHeatpointAreasJson
   * @request GET:/api/Heatmap/Json
   */
  getHeatpointAreasJson = (params: RequestParams = {}) =>
    this.request<HeatpointAreaDto[], any>({
      path: `/api/Heatmap/Json`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Heatmap
   * @name UpdateHeatpointArea
   * @request PUT:/api/Heatmap/{id}
   */
  updateHeatpointArea = ({ id }: UpdateHeatpointAreaParams, data: HeatpointAreaDto, params: RequestParams = {}) =>
    this.request<HeatpointArea, any>({
      path: `/api/Heatmap/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Heatmap
   * @name DeleteHeatpointArea
   * @request DELETE:/api/Heatmap/{id}
   */
  deleteHeatpointArea = ({ id }: DeleteHeatpointAreaParams, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Heatmap/${id}`,
      method: "DELETE",
      ...params,
    });
}
