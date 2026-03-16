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
export type EncryptionHashListQuery = NonNullable<
  Parameters<Encryption["encryptionHashList"]>[0]
>;

export type EncryptionKeysListQuery = NonNullable<
  Parameters<Encryption["encryptionKeysList"]>[0]
>;

/* =======================
   API Instance
   ======================= */
const encryptionApi = new Encryption();

/* =======================
   Paginated Query Methods
   ======================= */

/* =======================
   Simple Query Methods
   ======================= */
export async function encryptionHashList(
  query?: EncryptionHashListQuery,
  toastOptions?: ToastOptions,
): Promise<
  ApiResult<ExtractResponse<ReturnType<Encryption["encryptionHashList"]>>>
> {
  return handleApiResponse(
    () => encryptionApi.encryptionHashList(query),
    toastOptions,
  );
}

export async function encryptionKeysList(
  query?: EncryptionKeysListQuery,
  toastOptions?: ToastOptions,
): Promise<
  ApiResult<ExtractResponse<ReturnType<Encryption["encryptionKeysList"]>>>
> {
  return handleApiResponse(
    () => encryptionApi.encryptionKeysList(query),
    toastOptions,
  );
}

/* =======================
   Non-Query Methods
   ======================= */
export async function encryptionEncryptCreate(
  ...argsWithToast: [
    ...WithoutRequestParams<Parameters<Encryption["encryptionEncryptCreate"]>>,
    ToastOptions?,
    RequestParams?,
  ]
): Promise<
  ApiResult<ExtractResponse<ReturnType<Encryption["encryptionEncryptCreate"]>>>
> {
  const { args, toastOptions, params } =
    extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(
    () => encryptionApi.encryptionEncryptCreate(...args, params),
    toastOptions,
  );
}

export async function encryptionDecryptCreate(
  ...argsWithToast: [
    ...WithoutRequestParams<Parameters<Encryption["encryptionDecryptCreate"]>>,
    ToastOptions?,
    RequestParams?,
  ]
): Promise<
  ApiResult<ExtractResponse<ReturnType<Encryption["encryptionDecryptCreate"]>>>
> {
  const { args, toastOptions, params } =
    extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(
    () => encryptionApi.encryptionDecryptCreate(...args, params),
    toastOptions,
  );
}
