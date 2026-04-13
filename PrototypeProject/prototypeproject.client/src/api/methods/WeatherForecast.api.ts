import { WeatherForecast } from "../WeatherForecast";
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

/* =======================
   API Instance
   ======================= */
const weatherForecastApi = new WeatherForecast();

/* =======================
   Simple Query Methods
   ======================= */

/* =======================
   Non-Query Methods
   ======================= */
export async function get(
  ...argsWithToast: [
    ...WithoutRequestParams<Parameters<WeatherForecast["get"]>>,
    ToastOptions?,
    RequestParams?,
  ]
): Promise<ApiResult<ExtractResponse<ReturnType<WeatherForecast["get"]>>>> {
  const { args, toastOptions, params } =
    extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(
    () => weatherForecastApi.get(...args, params),
    toastOptions,
  );
}
