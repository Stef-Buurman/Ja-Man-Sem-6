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

import type { ApiResponse, EncryptDecryptRequest, GetKeyOptionsParams, HashRequest } from "./data-contracts";
import { ContentType, HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class Encryption<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Encryption
   * @name EncryptData
   * @request POST:/api/Encryption/encrypt
   */
  encryptData = (data: EncryptDecryptRequest, params: RequestParams = {}) =>
    this.request<ApiResponse, any>({
      path: `/api/Encryption/encrypt`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Encryption
   * @name GetProtectedData
   * @request GET:/api/Encryption/protected-data
   */
  getProtectedData = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Encryption/protected-data`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Encryption
   * @name DecryptData
   * @request POST:/api/Encryption/decrypt
   */
  decryptData = (data: EncryptDecryptRequest, params: RequestParams = {}) =>
    this.request<ApiResponse, any>({
      path: `/api/Encryption/decrypt`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Encryption
   * @name HashData
   * @request POST:/api/Encryption/hash
   */
  hashData = (data: HashRequest, params: RequestParams = {}) =>
    this.request<ApiResponse, any>({
      path: `/api/Encryption/hash`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Encryption
   * @name GetKeyOptions
   * @request GET:/api/Encryption/keys
   */
  getKeyOptions = (query: GetKeyOptionsParams, params: RequestParams = {}) =>
    this.request<ApiResponse, any>({
      path: `/api/Encryption/keys`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Encryption
   * @name GetPublicKey
   * @request GET:/api/Encryption/public-key
   */
  getPublicKey = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/api/Encryption/public-key`,
      method: "GET",
      format: "json",
      ...params,
    });
}
