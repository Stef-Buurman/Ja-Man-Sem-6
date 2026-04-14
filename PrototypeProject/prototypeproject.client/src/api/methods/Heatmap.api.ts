import { Heatmap } from "../Heatmap";
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
const heatmapApi = new Heatmap();

/* =======================
   Simple Query Methods
   ======================= */

/* =======================
   Non-Query Methods
   ======================= */
export async function addPoint(
  ...argsWithToast: [
    ...WithoutRequestParams<Parameters<Heatmap["addPoint"]>>,
    ToastOptions?,
    RequestParams?,
  ]
): Promise<ApiResult<ExtractResponse<ReturnType<Heatmap["addPoint"]>>>> {
  const { args, toastOptions, params } =
    extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(
    () => heatmapApi.addPoint(...args, params),
    toastOptions,
  );
}

export async function getHeatmap(
  ...argsWithToast: [
    ...WithoutRequestParams<Parameters<Heatmap["getHeatmap"]>>,
    ToastOptions?,
    RequestParams?,
  ]
): Promise<ApiResult<ExtractResponse<ReturnType<Heatmap["getHeatmap"]>>>> {
  const { args, toastOptions, params } =
    extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(
    () => heatmapApi.getHeatmap(...args, params),
    toastOptions,
  );
}

export async function getHeatpointAreas(
  ...argsWithToast: [
    ...WithoutRequestParams<Parameters<Heatmap["getHeatpointAreas"]>>,
    ToastOptions?,
    RequestParams?,
  ]
): Promise<
  ApiResult<ExtractResponse<ReturnType<Heatmap["getHeatpointAreas"]>>>
> {
  const { args, toastOptions, params } =
    extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(
    () => heatmapApi.getHeatpointAreas(...args, params),
    toastOptions,
  );
}

export async function addHeatpointArea(
  ...argsWithToast: [
    ...WithoutRequestParams<Parameters<Heatmap["addHeatpointArea"]>>,
    ToastOptions?,
    RequestParams?,
  ]
): Promise<
  ApiResult<ExtractResponse<ReturnType<Heatmap["addHeatpointArea"]>>>
> {
  const { args, toastOptions, params } =
    extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(
    () => heatmapApi.addHeatpointArea(...args, params),
    toastOptions,
  );
}

export async function updateRangeHeatpointArea(
  ...argsWithToast: [
    ...WithoutRequestParams<Parameters<Heatmap["updateRangeHeatpointArea"]>>,
    ToastOptions?,
    RequestParams?,
  ]
): Promise<
  ApiResult<ExtractResponse<ReturnType<Heatmap["updateRangeHeatpointArea"]>>>
> {
  const { args, toastOptions, params } =
    extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(
    () => heatmapApi.updateRangeHeatpointArea(...args, params),
    toastOptions,
  );
}

export async function updateHeatpointArea(
  ...argsWithToast: [
    ...WithoutRequestParams<Parameters<Heatmap["updateHeatpointArea"]>>,
    ToastOptions?,
    RequestParams?,
  ]
): Promise<
  ApiResult<ExtractResponse<ReturnType<Heatmap["updateHeatpointArea"]>>>
> {
  const { args, toastOptions, params } =
    extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(
    () => heatmapApi.updateHeatpointArea(...args, params),
    toastOptions,
  );
}

export async function deleteHeatpointArea(
  ...argsWithToast: [
    ...WithoutRequestParams<Parameters<Heatmap["deleteHeatpointArea"]>>,
    ToastOptions?,
    RequestParams?,
  ]
): Promise<
  ApiResult<ExtractResponse<ReturnType<Heatmap["deleteHeatpointArea"]>>>
> {
  const { args, toastOptions, params } =
    extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(
    () => heatmapApi.deleteHeatpointArea(...args, params),
    toastOptions,
  );
}
