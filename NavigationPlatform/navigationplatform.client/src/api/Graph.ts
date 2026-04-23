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

import type { GetGraphParams, GraphDto } from "./data-contracts";
import { ContentType, HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class Graph<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Graph
   * @name ImportGraph
   * @request POST:/api/graph
   */
  importGraph = (data: GraphDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/graph`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Graph
   * @name GetGraph
   * @request GET:/api/graph
   */
  getGraph = (query: GetGraphParams, params: RequestParams = {}) =>
    this.request<GraphDto, any>({
      path: `/api/graph`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Graph
   * @name UpdateGraph
   * @request PUT:/api/graph
   */
  updateGraph = (data: GraphDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/graph`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
