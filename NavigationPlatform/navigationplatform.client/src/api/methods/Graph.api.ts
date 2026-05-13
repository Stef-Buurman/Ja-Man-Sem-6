import { Graph } from "../Graph";
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
export type GetGraphQuery = NonNullable<Parameters<Graph["getGraph"]>[0]>;

/* =======================
   API Instance
   ======================= */
const graphApi = new Graph();

/* =======================
   Simple Query Methods
   ======================= */
export async function getGraph(
  query: GetGraphQuery,
  toastOptions?: ToastOptions,
): Promise<ApiResult<ExtractResponse<ReturnType<Graph["getGraph"]>>>> {
  return handleApiResponse(() => graphApi.getGraph(query), toastOptions);
}

/* =======================
   Non-Query Methods
   ======================= */
export async function getWholeGraph(
  ...argsWithToast: [...WithoutRequestParams<Parameters<Graph["getWholeGraph"]>>, ToastOptions?, RequestParams?]
): Promise<ApiResult<ExtractResponse<ReturnType<Graph["getWholeGraph"]>>>> {
  const { args, toastOptions, params } = extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(() => graphApi.getWholeGraph(...args, params), toastOptions);
}

export async function importGraph(
  ...argsWithToast: [...WithoutRequestParams<Parameters<Graph["importGraph"]>>, ToastOptions?, RequestParams?]
): Promise<ApiResult<ExtractResponse<ReturnType<Graph["importGraph"]>>>> {
  const { args, toastOptions, params } = extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(() => graphApi.importGraph(...args, params), toastOptions);
}

export async function updateGraph(
  ...argsWithToast: [...WithoutRequestParams<Parameters<Graph["updateGraph"]>>, ToastOptions?, RequestParams?]
): Promise<ApiResult<ExtractResponse<ReturnType<Graph["updateGraph"]>>>> {
  const { args, toastOptions, params } = extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(() => graphApi.updateGraph(...args, params), toastOptions);
}
