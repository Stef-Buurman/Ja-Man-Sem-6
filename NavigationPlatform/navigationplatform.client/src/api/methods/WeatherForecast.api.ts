import { WeatherForecast } from "../WeatherForecast";
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
const weatherForecastApi = new WeatherForecast();

/* =======================
   Paginated Query Methods
   ======================= */

/* =======================
   Simple Query Methods
   ======================= */

/* =======================
   Non-Query Methods
   ======================= */
export async function get(
  ...argsWithToast: [...WithoutRequestParams<Parameters<WeatherForecast["get"]>>, ToastOptions?, RequestParams?]
): Promise<ApiResult<ExtractResponse<ReturnType<WeatherForecast["get"]>>>> {
  const { args, toastOptions, params } = extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(() => weatherForecastApi.get(...args, params), toastOptions);
}
