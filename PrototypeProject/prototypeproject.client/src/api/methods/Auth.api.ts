import { Auth } from "../Auth";
import type { ExtractResponse, ToastOptions, WithoutRequestParams } from "./Types";
import type { RequestParams } from "../http-client";
import { handleApiResponse } from "../../utils/HandleApiResponse";
import type { ApiResult } from "../../interfaces/responses/ApiResult";
import { extractArgsToastsAndParams } from "../../utils/ExtractArgsToastsAndParams";

/* =======================
   Query Types
   ======================= */

/* =======================
   API Instance
   ======================= */
const authApi = new Auth();

/* =======================
   Simple Query Methods
   ======================= */

/* =======================
   Non-Query Methods
   ======================= */
export async function getJwt(
  ...argsWithToast: [...WithoutRequestParams<Parameters<Auth["getJwt"]>>, ToastOptions?, RequestParams?]
): Promise<ApiResult<ExtractResponse<ReturnType<Auth["getJwt"]>>>> {
  const { args, toastOptions, params } = extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(() => authApi.getJwt(...args, params), toastOptions);
}
