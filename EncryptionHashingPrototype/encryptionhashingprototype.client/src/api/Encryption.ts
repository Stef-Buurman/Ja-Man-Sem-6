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

import type { ApiResponse, EncryptDecryptRequest } from "./data-contracts";
import { ContentType, HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class Encryption<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Encryption
   * @name EncryptionEncryptCreate
   * @request POST:/api/Encryption/encrypt
   */
  encryptionEncryptCreate = (
    data: EncryptDecryptRequest,
    params: RequestParams = {},
  ) =>
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
   * @name EncryptionDecryptCreate
   * @request POST:/api/Encryption/decrypt
   */
  encryptionDecryptCreate = (
    data: EncryptDecryptRequest,
    params: RequestParams = {},
  ) =>
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
   * @name EncryptionHashList
   * @request GET:/api/Encryption/hash
   */
  encryptionHashList = (
    query?: {
      data?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiResponse, any>({
      path: `/api/Encryption/hash`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Encryption
   * @name EncryptionKeysList
   * @request GET:/api/Encryption/keys
   */
  encryptionKeysList = (
    query?: {
      /**
       * @format int32
       * @default 5
       */
      amount?: number;
    },
    params: RequestParams = {},
  ) =>
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
   * @name EncryptionPublicKeyList
   * @request GET:/api/Encryption/public-key
   */
  encryptionPublicKeyList = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/api/Encryption/public-key`,
      method: "GET",
      format: "json",
      ...params,
    });
}
