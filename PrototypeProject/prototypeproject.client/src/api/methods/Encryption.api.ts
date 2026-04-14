import { Encryption } from "../Encryption";
import type {
  ExtractResponse,
  ToastOptions,
  WithoutRequestParams,
} from "./Types";
import type { RequestParams } from "../http-client";
import { handleApiResponse } from "../../utils/HandleApiResponse";
import type { ApiResult } from "../../interfaces/responses/ApiResult";
import { extractArgsToastsAndParams } from "../../utils/ExtractArgsToastsAndParams";

/* =======================
   Query Types
   ======================= */
export type GetKeyOptionsQuery = NonNullable<
  Parameters<Encryption["getKeyOptions"]>[0]
>;

/* =======================
   API Instance
   ======================= */
const encryptionApi = new Encryption();

/* =======================
   Simple Query Methods
   ======================= */
export async function getKeyOptions(
  query?: GetKeyOptionsQuery,
  toastOptions?: ToastOptions,
  params?: RequestParams,
): Promise<
  ApiResult<ExtractResponse<ReturnType<Encryption["getKeyOptions"]>>>
> {
  return handleApiResponse(
    () => encryptionApi.getKeyOptions(query, params),
    toastOptions,
  );
}

/* =======================
   Non-Query Methods
   ======================= */
export async function encryptData(
  ...argsWithToast: [
    ...WithoutRequestParams<Parameters<Encryption["encryptData"]>>,
    ToastOptions?,
    RequestParams?,
  ]
): Promise<ApiResult<ExtractResponse<ReturnType<Encryption["encryptData"]>>>> {
  const { args, toastOptions, params } =
    extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(
    () => encryptionApi.encryptData(...args, params),
    toastOptions,
  );
}

export async function getProtectedData(
  ...argsWithToast: [
    ...WithoutRequestParams<Parameters<Encryption["getProtectedData"]>>,
    ToastOptions?,
    RequestParams?,
  ]
): Promise<
  ApiResult<ExtractResponse<ReturnType<Encryption["getProtectedData"]>>>
> {
  const { args, toastOptions, params } =
    extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(
    () => encryptionApi.getProtectedData(...args, params),
    toastOptions,
  );
}

export async function decryptData(
  ...argsWithToast: [
    ...WithoutRequestParams<Parameters<Encryption["decryptData"]>>,
    ToastOptions?,
    RequestParams?,
  ]
): Promise<ApiResult<ExtractResponse<ReturnType<Encryption["decryptData"]>>>> {
  const { args, toastOptions, params } =
    extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(
    () => encryptionApi.decryptData(...args, params),
    toastOptions,
  );
}

export async function hashData(
  ...argsWithToast: [
    ...WithoutRequestParams<Parameters<Encryption["hashData"]>>,
    ToastOptions?,
    RequestParams?,
  ]
): Promise<ApiResult<ExtractResponse<ReturnType<Encryption["hashData"]>>>> {
  const { args, toastOptions, params } =
    extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(
    () => encryptionApi.hashData(...args, params),
    toastOptions,
  );
}

export async function getPublicKey(
  ...argsWithToast: [
    ...WithoutRequestParams<Parameters<Encryption["getPublicKey"]>>,
    ToastOptions?,
    RequestParams?,
  ]
): Promise<ApiResult<ExtractResponse<ReturnType<Encryption["getPublicKey"]>>>> {
  const { args, toastOptions, params } =
    extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(
    () => encryptionApi.getPublicKey(...args, params),
    toastOptions,
  );
}
