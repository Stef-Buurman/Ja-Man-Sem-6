import type { HttpResponse } from "../api/http-client";
import type { ToastOptions } from "../api/methods/Types";
import { toast } from "../components/toast-manager/toast-context";
import type { ApiResult } from "../interfaces/responses/ApiResult";

export async function handleApiResponse<T>(call: () => Promise<HttpResponse<T, any>>, toastOptions: ToastOptions | undefined): Promise<ApiResult<T>> {
  let response: HttpResponse<T, any> | undefined;

  try {
    response = await call();

    const isOk = response.ok;
    const toastSuccess = toastOptions?.toastSuccess;
    const toastError = toastOptions?.toastError;

    if (isOk && toastSuccess) {
      toast.success(toastSuccess.message, toastSuccess.title);
    } else if (!isOk) {
      if (toastError) {
        toast.error(toastError.message, toastError.title);
      } else {
        toast.errorResponse(response);
      }
    }

    let data: T | undefined;
    try {
      const textData = await response.text();
      data = JSON.parse(textData) as T;
    } catch {
      data = undefined;
    }

    if (isOk) {
      return { ok: true, status: response.status, response: data as T };
    } else {
      return {
        ok: false,
        status: response.status,
        response: data,
        error: null,
      };
    }
  } catch (error) {
    toast.errorResponse(error as any);
    return {
      ok: false,
      status: response?.status ?? 0,
      response: undefined,
      error,
    };
  }
}
