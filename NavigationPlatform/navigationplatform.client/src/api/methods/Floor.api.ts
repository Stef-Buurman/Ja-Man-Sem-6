import { Floor } from "../Floor";
import { handleApiResponse } from "../../utils/HandleApiResponse";
import { extractArgsToastsAndParams } from "../../utils/ExtractArgsToastsAndParams";
import type { ApiResult } from "../../interfaces/responses/ApiResult";
import type { RequestParams } from "../http-client";
import type {
  SortableKeys,
  ExtractResponse,
  UnwrapArray,
  ExtractDataIfPaginated,
  ToastOptions,
  WithoutRequestParams,
} from "./Types";

/* =======================
   Query Types
   ======================= */

/* =======================
   API Instance
   ======================= */
const floorApi = new Floor();

/* =======================
   Simple Query Methods
   ======================= */

/* =======================
   Non-Query Methods
   ======================= */
export async function getFloors(
  ...argsWithToast: [...WithoutRequestParams<Parameters<Floor["getFloors"]>>, ToastOptions?, RequestParams?]
): Promise<ApiResult<ExtractResponse<ReturnType<Floor["getFloors"]>>>> {
  const { args, toastOptions, params } = extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(() => floorApi.getFloors(...args, params), toastOptions);
}
