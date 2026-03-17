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
export type HashDataQuery = NonNullable<Parameters<Encryption["hashData"]>[0]>;

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
export async function hashData(
  query?: HashDataQuery,
  toastOptions?: ToastOptions,
): Promise<ApiResult<ExtractResponse<ReturnType<Encryption["hashData"]>>>> {
  return handleApiResponse(() => encryptionApi.hashData(query), toastOptions);
}

export async function getKeyOptions(
  query?: GetKeyOptionsQuery,
  toastOptions?: ToastOptions,
): Promise<
  ApiResult<ExtractResponse<ReturnType<Encryption["getKeyOptions"]>>>
> {
  return handleApiResponse(
    () => encryptionApi.getKeyOptions(query),
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

export async function encryptionPublicKeyList(
  ...argsWithToast: [
    ...WithoutRequestParams<Parameters<Encryption["encryptionPublicKeyList"]>>,
    ToastOptions?,
    RequestParams?,
  ]
): Promise<
  ApiResult<ExtractResponse<ReturnType<Encryption["encryptionPublicKeyList"]>>>
> {
  const { args, toastOptions, params } =
    extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(
    () => encryptionApi.encryptionPublicKeyList(...args, params),
    toastOptions,
  );
}
